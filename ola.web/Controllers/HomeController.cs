using Microsoft.AspNet.SignalR;
using ola.web.Helpers;
using ola.web.Hubs;
using ola.web.Models;
using System;
using System.Web.Mvc;

namespace ola.web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult GetNewOpenNumber(GetNewOpenNumberDTO dto)
        {
            var _context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            //dto.LotteryId
            var html = LotteryHelper.Generate(dto.LotteryId);
            //dto.LotteryId.ToString()
            _context.Clients.Group(dto.LotteryId.ToString()).GetNewOpenNumber(html);
            return Json("success", JsonRequestBehavior.AllowGet);
        }


        public ActionResult Chat()
        {
            return View();
        }
    }
}