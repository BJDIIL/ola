using ola.web.Configs;
using ola.web.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ola.web.Controllers
{
    public class LController : BaseController
    {
        // GET: Lottery
        //[OutputCache(Duration = 20, VaryByParam = "lotteryId")]
        public ActionResult Index(int lId = 2)
        {
            ViewBag.lId = lId;
            var data = LotteryHelper.GetPageOfData(lId);
            return View(data);
        }


    }
}