using log4net;
using Newtonsoft.Json;
using ola.core.DysmsapiSdk;
using ola.core.Enum;
using ola.frame.web.Models;
using ola.model;
using ola.web.Configs;
using ola.web.Models;
using Senparc.Weixin;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using System;
using System.Configuration;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ola.web.Controllers
{
    public class LoginController : Controller
    {
        protected static readonly ILog log = LogManager.GetLogger(typeof(LoginController));
        /// <summary>
        /// 扫码进入 携带密钥AuthCode
        /// </summary>
        /// <param name="authCode"></param>
        /// <returns></returns>
        public ActionResult Index(string returnUrl, string authCode)
        {
            //log.Info("authCode:" + authCode + " returnUrl:" + returnUrl);
            var redirectUrl = WebConfigs.WebSiteBaseUrl + "/Login/BaseCallback?authCode=" + authCode + "&returnUrl=" + HttpUtility.UrlEncode(returnUrl);
            //log.Info("redirectUrl:" + redirectUrl);
            var url = OAuthApi.GetAuthorizeUrl(WeiXinConfig.appId, redirectUrl, "STATE", OAuthScope.snsapi_userinfo);
            return Redirect(url);
        }

        public async Task<ActionResult> BaseCallback(string code, string state, string authCode, string returnUrl)
        {
            //log.Info("code:" + code + " state:" + state + " authCode:" + authCode + " returnUrl:" + returnUrl);
            if (string.IsNullOrEmpty(code))
            {
                ViewBag.Info = "您拒绝了授权！";
                return View("Info");
            }

            OAuthAccessTokenResult result = null;

            //通过，用code换取access_token
            try
            {
                result = OAuthApi.GetAccessToken(WeiXinConfig.appId, WeiXinConfig.appSecret, code);

                if (result.errcode != ReturnCode.请求成功)
                {
                    ViewBag.Info = "错误：" + result.errmsg;
                    return View("Info");
                }
                //下面2个数据也可以自己封装成一个类，储存在数据库中（建议结合缓存）
                //如果可以确保安全，可以将access_token存入用户的cookie中，每一个人的access_token是不一样的
                //Session["OAuthAccessTokenStartTime"] = DateTime.Now;
                //Session["OAuthAccessToken"] = result;

                //因为第一步选择的是OAuthScope.snsapi_userinfo，这里可以进一步获取用户详细信息
                using (var db = new OlaEntities())
                {
                    var wxUser = await db.WeiXinUsers.FirstOrDefaultAsync(w => w.openid == result.openid);
                    if (wxUser == null)
                    {
                        //log.Info(JsonConvert.SerializeObject(result));
                        OAuthUserInfo userInfo = OAuthApi.GetUserInfo(result.access_token, result.openid);
                        //log.Info(JsonConvert.SerializeObject(userInfo));

                        if (string.IsNullOrEmpty(authCode))
                        {
                            ViewBag.Info = "验证失败！请从正规途径进入！" + result.errmsg;
                            return View("Info");
                        }

                        wxUser = new WeiXinUser
                        {
                            city = userInfo.city,
                            country = userInfo.country,
                            headimgurl = userInfo.headimgurl,
                            nickname = userInfo.nickname,
                            openid = userInfo.openid,
                            province = userInfo.province,
                            sex = userInfo.sex,
                            unionid = userInfo.unionid,
                            CreateTime = DateTime.Now,
                            phone = null,
                            AuthCode = authCode,
                            state = (int)WeiXinUserStateEnum.Normal,
                        };
                        db.WeiXinUsers.Add(wxUser);
                        await db.SaveChangesAsync();
                    }
                    if (string.IsNullOrEmpty(wxUser.phone))
                    {
                        if (!string.IsNullOrEmpty(authCode))
                        {
                            return RedirectToAction("Register", new { authCode, wxUser.openid });
                        }
                        else
                        {
                            ViewBag.Info = "验证失败！请从正规途径进入！";
                            return View("Info");
                        }
                    }
                    if (wxUser.state != (int)WeiXinUserStateEnum.Normal)
                    {
                        ViewBag.Info = "您已经被限制访问该网站，请联系网站负责人！";
                        return View("Info");
                    }
                    WriteCookie(wxUser.Id);

                }
                //log.Info("login:" + JsonConvert.SerializeObject(wxUser));
                return RedirectToAction("Index", "L");
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
                ViewBag.Info = ex.Message;
                return View("Info");
            }
        }

        private void WriteCookie(int id)
        {
            var cookieInfo = new CookieInfo { UserId = id };
            var version = 1;
            var name = id.ToString();
            var expire = DateTime.Now.AddDays(30);
            var userData = JsonConvert.SerializeObject(cookieInfo);
            var ticket = new FormsAuthenticationTicket(version, name, DateTime.Now, expire, true, userData);
            var cookieName = ConfigurationManager.AppSettings["AuthCookieName"];
            var domain = ConfigurationManager.AppSettings["CookieDomain"].ToString();
            var value = FormsAuthentication.Encrypt(ticket);
            HttpCookie cookie = new HttpCookie(cookieName)
            {
                Domain = domain,
                Value = value,
                Expires = expire,
            };

            Response.Cookies.Add(cookie);
        }

        public ActionResult Register(string authCode, string openId)
        {
            ViewBag.AuthCode = authCode;
            ViewBag.OpenId = openId;

            if (string.IsNullOrEmpty(authCode))
            {
                return Json("请从官方渠道进入", JsonRequestBehavior.AllowGet);
            }
            using (var db = new OlaEntities())
            {
                var ac = db.AuthCodes.FirstOrDefaultAsync(w => w.Code == authCode && w.IsExpired == false);
                if (ac == null)
                {
                    return Json("请从官方渠道进入，没有邀请码无法注册", JsonRequestBehavior.AllowGet);
                }
            }
            return View();

        }

        [HttpPost]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (string.IsNullOrEmpty(model.AuthCode))
            {
                return Json("请从官方渠道进入", JsonRequestBehavior.AllowGet);
            }
            //SuperAuthCode 
            var superAuthCode = ConfigurationManager.AppSettings["SuperAuthCode"].ToString();
            if (superAuthCode.ToLower() != model.AuthCode.ToLower())
            {
                using (var db = new OlaEntities())
                {
                    var ac = db.AuthCodes.FirstOrDefaultAsync(w => w.Code == model.AuthCode);
                    if (ac == null)
                    {
                        return Json("请从官方渠道进入，没有邀请码无法注册", JsonRequestBehavior.AllowGet);
                    }
                }
            }

            // 验证短信验证码
            var key = SMS_Prefix + model.Mobile;
            if (Session[key] == null)
            {
                return Json("验证码已过期", JsonRequestBehavior.AllowGet);
            }

            if (Session[key].ToString() != model.Vcode)
            {
                return Json("验证码错误", JsonRequestBehavior.AllowGet);
            }
            using (var db = new OlaEntities())
            {
                var wxUser = await db.WeiXinUsers.FirstOrDefaultAsync(w => w.openid == model.OpenId);
                if (wxUser == null)
                {
                    return Json("账户信息不存在，请重新进入", JsonRequestBehavior.AllowGet);
                }
                wxUser.phone = model.Mobile;
                await db.SaveChangesAsync();
                WriteCookie(wxUser.Id);
            }
            return Json("success", JsonRequestBehavior.AllowGet);

        }

        private readonly string SMS_Prefix = "wojosjdf(&&457@!#$";
        [HttpPost]
        public ActionResult SendVCode(string mobile)
        {
            var key = SMS_Prefix + mobile;
            if (Session[key] == null)
            {
                var vcode = new Random().Next(1000, 9999);
                var tempParam = "{\"code\":\"" + vcode + "\"}";
                var response = SMS.Send(mobile, "领航科技", "SMS_135320165", tempParam, null);
                if (response.Code == "OK")
                {
                    Session[key] = vcode;
                    Session["TimeOut"] = DateTime.Now.AddMinutes(5);
                    Session.Timeout = 5;
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("发送失败：" + response.Message, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                var ts = ((DateTime)Session["TimeOut"] - DateTime.Now);
                if (ts.TotalSeconds > 0)
                {
                    return Json("请在" + ts.TotalSeconds + "秒以后重试！", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Session[key] = null;
                    return Json("已过期，请重试", JsonRequestBehavior.AllowGet);
                }

            }

        }
    }
}