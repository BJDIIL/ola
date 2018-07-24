using log4net;
using Newtonsoft.Json;
using ola.frame.web.Models;
using System;
using System.Configuration;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ola.frame.web.Filters
{
    public class AdminAuthAttribute : AuthorizeAttribute
    {
        protected static readonly ILog log = LogManager.GetLogger(typeof(AdminAuthAttribute));
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            //return;
            try
            {
                var redirectUrl = "/Admin/Account/Login?returnUrl=" + filterContext.HttpContext.Request.Url;
                var cookieName = ConfigurationManager.AppSettings["AdminAuthCookieName"];
                var cookie = filterContext.HttpContext.Request.Cookies[cookieName];
                if (cookie == null)
                {
                    filterContext.Result = new RedirectResult(redirectUrl);
                    return;
                }

                FormsAuthenticationTicket ticket;
                ticket = FormsAuthentication.Decrypt(cookie.Value);
                if (ticket == null)
                {
                    filterContext.Result = new RedirectResult(redirectUrl);
                    return;
                }
                CookieInfo cookieInfo;
                cookieInfo = JsonConvert.DeserializeObject<CookieInfo>(ticket.UserData);
                if (cookieInfo == null || cookieInfo.UserId == 0)
                {
                    var domain = ConfigurationManager.AppSettings["CookieDomain"].ToString();
                    HttpCookie cookietemp = new HttpCookie(cookieName)
                    {
                        Domain = domain,
                        Expires = DateTime.Now.AddDays(-1)
                    };
                    filterContext.HttpContext.Response.Cookies.Add(cookietemp);
                    filterContext.Result = new RedirectResult(redirectUrl);
                    return;
                }
            }
            catch (Exception ex)
            {
                log.Error(ex.Message, ex);
            }
        }
    }
}
