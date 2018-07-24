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

namespace ola.web.Areas.Admin.Controllers
{
    public class LotteryOpenHistoriesController : AdminController
    {
        private OlaEntities db = new OlaEntities();

        // GET: Admin/LotteryOpenHistories
        public ActionResult Index(int lotteryId = 2, string qiHao = "", int pageNumber = 1, int pageSize = 20)
        {
            ViewBag.lotteryId = lotteryId;
            ViewBag.qiHao = qiHao;
            var query = db.LotteryOpenHistories
                .Where(w => w.LotteryId == lotteryId && w.QiHao.Contains(qiHao))
                .OrderByDescending(w => w.QiHao);

            var data = new PagedList<LotteryOpenHistory>(query, pageNumber, pageSize);
            return View(data);
        }

        // GET: Admin/LotteryOpenHistories/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            LotteryOpenHistory lotteryOpenHistory = await db.LotteryOpenHistories.FindAsync(id);
            if (lotteryOpenHistory == null)
            {
                return HttpNotFound();
            }
            return View(lotteryOpenHistory);
        }

        // GET: Admin/LotteryOpenHistories/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/LotteryOpenHistories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,LotteryId,QiHao,OpenNumber,OpenTime,CreateTime,UpdateTime,Source,Forecast1,Forecast2,Forecast3,Used,CurrentForecastNumber,ForecastFrom,UsedBy")] LotteryOpenHistory lotteryOpenHistory)
        {
            if (ModelState.IsValid)
            {
                lotteryOpenHistory.Id = Guid.NewGuid();
                db.LotteryOpenHistories.Add(lotteryOpenHistory);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(lotteryOpenHistory);
        }

        // GET: Admin/LotteryOpenHistories/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            LotteryOpenHistory lotteryOpenHistory = await db.LotteryOpenHistories.FindAsync(id);
            if (lotteryOpenHistory == null)
            {
                return HttpNotFound();
            }
            return View(lotteryOpenHistory);
        }

        // POST: Admin/LotteryOpenHistories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,LotteryId,QiHao,OpenNumber,OpenTime,CreateTime,UpdateTime,Source,Forecast1,Forecast2,Forecast3,Used,CurrentForecastNumber,ForecastFrom,UsedBy")] LotteryOpenHistory lotteryOpenHistory)
        {
            if (ModelState.IsValid)
            {
                db.Entry(lotteryOpenHistory).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(lotteryOpenHistory);
        }

        // GET: Admin/LotteryOpenHistories/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            LotteryOpenHistory lotteryOpenHistory = await db.LotteryOpenHistories.FindAsync(id);
            if (lotteryOpenHistory == null)
            {
                return HttpNotFound();
            }
            return View(lotteryOpenHistory);
        }

        // POST: Admin/LotteryOpenHistories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            LotteryOpenHistory lotteryOpenHistory = await db.LotteryOpenHistories.FindAsync(id);
            db.LotteryOpenHistories.Remove(lotteryOpenHistory);
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
