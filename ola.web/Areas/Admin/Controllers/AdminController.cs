using ola.frame.web.Filters;
using System.Web.Mvc;

namespace ola.web.Areas.Admin.Controllers
{
    /// <summary>
    /// 后台控制器基类
    /// 
    /// </summary>
    [AdminAuth]
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        public AdminController()
        {

        }
    }
}