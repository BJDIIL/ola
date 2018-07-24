using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ola.model;
using PagedList;
using ola.core.Enum;

namespace ola.web.Areas.Admin.Controllers
{
    public class WeiXinUsersController : AdminController
    {
        private OlaEntities db = new OlaEntities();
        // GET: Admin/WeiXinUsers
        public ActionResult Index(string searchKey = "", int pageNumber = 1, int pageSize = 20)
        {
            ViewBag.searchKey = searchKey;
            var query = db.WeiXinUsers.AsQueryable();
            if (!string.IsNullOrEmpty(searchKey))
            {
                query = query.Where(w => w.city.Contains(searchKey)
                   || w.country.Contains(searchKey)
                   || w.headimgurl.Contains(searchKey)
                   || w.nickname.Contains(searchKey)
                   //|| w.openid.Contains(searchKey)
                   || w.phone.Contains(searchKey)
                   || w.province.Contains(searchKey));
            }

            query = query.OrderByDescending(w => w.Id);

            var data = new PagedList<WeiXinUser>(query, pageNumber, pageSize);
            return View(data);
        }

        // GET: Admin/WeiXinUsers/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WeiXinUser weiXinUser = await db.WeiXinUsers.FindAsync(id);
            if (weiXinUser == null)
            {
                return HttpNotFound();
            }
            return View(weiXinUser);
        }

        // GET: Admin/WeiXinUsers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/WeiXinUsers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,openid,nickname,sex,province,city,country,headimgurl,unionid,phone")] WeiXinUser weiXinUser)
        {
            if (ModelState.IsValid)
            {
                db.WeiXinUsers.Add(weiXinUser);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(weiXinUser);
        }

        // GET: Admin/WeiXinUsers/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WeiXinUser weiXinUser = await db.WeiXinUsers.FindAsync(id);
            if (weiXinUser == null)
            {
                return HttpNotFound();
            }
            return View(weiXinUser);
        }

        // POST: Admin/WeiXinUsers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,openid,nickname,sex,province,city,country,headimgurl,unionid,phone")] WeiXinUser weiXinUser)
        {
            if (ModelState.IsValid)
            {
                db.Entry(weiXinUser).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(weiXinUser);
        }



        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            WeiXinUser weiXinUser = await db.WeiXinUsers.FindAsync(id);
            if (weiXinUser.state == (int)WeiXinUserStateEnum.NotAccess)
            {
                weiXinUser.state = (int)WeiXinUserStateEnum.Normal;
            }
            else
            {
                weiXinUser.state = (int)WeiXinUserStateEnum.NotAccess;
            }

            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
