using ola.model;
using ola.web.Configs;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ola.web.Areas.Admin.Controllers
{
    public class AuthCodeController : AdminController
    {
        private OlaEntities db = new OlaEntities();
        // GET: Admin/AuthCode
        public ActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> GenerateQrCodeUrl(bool newAuthCode = false)
        {
            AuthCode authCode = null;
            if (!newAuthCode)
            {
                authCode = await db.AuthCodes.Where(w => w.IsExpired == false).OrderByDescending(w => w.Id).FirstOrDefaultAsync();
                if (authCode != null)
                {
                    return Json(new { errno = 0, QrCodeUrl = authCode.QrCodeUrl, msg = "" }, JsonRequestBehavior.AllowGet);
                }
            }
            var olds = await db.AuthCodes.Where(w => w.IsExpired == false).ToListAsync();
            foreach (var item in olds)
            {
                item.IsExpired = true;
            }
            await db.SaveChangesAsync();
            authCode = new AuthCode
            {
                Code = Guid.NewGuid().ToString("N"),
                CreateTime = DateTime.Now,
                IsExpired = false,
                QrCodeUrl = null,
            };

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            var plainText = WebConfigs.WebSiteBaseUrl + "/Login/Index?authCode=" + authCode.Code;
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(plainText, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);
            var baseDir = AppDomain.CurrentDomain.BaseDirectory;
            var dir = "/Content/QRCodes/" + DateTime.Now.ToString("yyyyMMdd");
            if (!Directory.Exists(baseDir + dir))
            {
                Directory.CreateDirectory(baseDir + dir);
            }
            var fileName = "/" + authCode.Code + ".jpg";
            qrCodeImage.Save(baseDir + dir + fileName, ImageFormat.Jpeg);
            authCode.QrCodeUrl = dir + fileName;
            db.AuthCodes.Add(authCode);
            await db.SaveChangesAsync();
            return Json(new { errno = 0, QrCodeUrl = authCode.QrCodeUrl, msg = "" }, JsonRequestBehavior.AllowGet);
        }
    }
}