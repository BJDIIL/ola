using Newtonsoft.Json;
using ola.core.Helpers;
using ola.frame.web.Models;
using ola.model;
using ola.web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ola.web.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        private OlaEntities db = new OlaEntities();
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<string> Login(LoginViewModel loginViewModel)
        {
            if (Session["VCode"] == null)
            {
                return "验证码已过期";
            }
            if (Session["VCode"].ToString().ToLower() != loginViewModel.Vcode.ToLower())
            {
                return "验证码错误";
            }
            var user = await db.Accounts.FirstOrDefaultAsync(w => w.UserName == loginViewModel.UserName);
            if (user == null)
            {
                return "用户不存在";
            }

            if (user.State != 0)
            {
                return "该用户已被禁用";
            }

            var pwd = MD5Helper.MD5Encrypt64(loginViewModel.Pwd);
            if (user.Pwd != pwd)
            {
                return "密码错误";
            }

            WriteCookie(user.Id);
            Session["VCode"] = null;
            return "success";
        }
        private void WriteCookie(int id)
        {
            var cookieInfo = new CookieInfo { UserId = id };
            var version = 1;
            var name = id.ToString();
            var expire = DateTime.Now.AddDays(30);
            var userData = JsonConvert.SerializeObject(cookieInfo);
            var ticket = new FormsAuthenticationTicket(version, name, DateTime.Now, expire, true, userData);
            var cookieName = ConfigurationManager.AppSettings["AdminAuthCookieName"];
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


        [HttpPost]
        public ActionResult Logout()
        {

            return View();
        }

        public ActionResult VCode()
        {
            //首先实例化验证码的类  
            VerifyCodeHelper validateCode = new VerifyCodeHelper();
            //生成验证码指定的长度  
            string code = validateCode.GetRandomString(4);
            Session["VCode"] = code;
            //创建验证码的图片  
            byte[] bytes = validateCode.CreateImage(code);
            //最后将验证码返回  
            return File(bytes, @"image/jpeg");
        }

    }
}