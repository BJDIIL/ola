using HtmlAgilityPack;
using log4net;
using Newtonsoft.Json;
using ola.core.Enum;
using ola.model;
using ola.monitor.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml.Linq;

namespace ola.monitor.GetLotteryOpenNumbers
{
    public class GetLotteryOpenNumber : IGetLotteryOpenNumber
    {
        protected static readonly ILog log = LogManager.GetLogger(typeof(GetLotteryOpenNumber));
        protected LotteryInfo lottery;
        protected DateTime NextRequestDT = DateTime.Now;
        protected int NextQiHao = 0;

        public GetLotteryOpenNumber(LotteryInfo lottery)
        {
            this.lottery = lottery;


            using (var db = new OlaEntities())
            {
                log.Info("获取最新开奖时间:" + this.lottery.LotteryId);
                var lotteryOpen = db.LotteryOpenHistories
                    .Where(w => w.LotteryId == this.lottery.LotteryId).OrderByDescending(w => w.QiHao).FirstOrDefault();
                if (lotteryOpen != null)
                {
                    var lotteryOpenTimes = db.LotteryOpenTimes
                        .FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpen.QiHao);
                    if (lotteryOpenTimes != null)
                    {
                        var nextInfo = db.LotteryOpenTimes
                            .FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                        if (nextInfo != null)
                        {
                            this.NextRequestDT = nextInfo.OpenTime;
                        }
                    }
                }
            }
        }

        public void GetLotteryOpenNumberFrom163()
        {
            if (DateTime.Now <= this.NextRequestDT
                || string.IsNullOrEmpty(this.lottery.url163))
            {
                return;
            }
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb();
                HtmlWeb.PreRequestHandler handler = delegate (HttpWebRequest request)
                {
                    request.Headers[HttpRequestHeader.AcceptEncoding] = "gzip, deflate";
                    request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
                    request.CookieContainer = new CookieContainer();
                    return true;
                };
                htmlWeb.PreRequest += handler;
                var doc = htmlWeb.Load(this.lottery.url163);

                var tds = doc.DocumentNode.SelectNodes("//td");
                if (tds == null)
                {
                    return;
                }
                var lotteries = new List<LotteryOpenHistory>();
                foreach (var td in tds)
                {
                    try
                    {
                        HtmlAttribute attr_data_win_number = td.Attributes["data-award"];
                        HtmlAttribute attr_data_period = td.Attributes["data-period"];
                        if (attr_data_win_number != null && attr_data_period != null)
                        {
                            var win_number = attr_data_win_number.Value;
                            var period = attr_data_period.Value;
                            if (string.IsNullOrEmpty(win_number) || string.IsNullOrEmpty(period))
                            {
                                continue;
                            }
                            period = this.lottery.Prefix + period;
                            // 过滤掉已经添加的期号
                            var qihao = Convert.ToInt32(period);
                            if (qihao < this.NextQiHao)
                            {
                                continue;
                            }
                            lotteries.Add(new LotteryOpenHistory
                            {
                                OpenNumber = win_number.Replace(" ", ","),
                                QiHao = period,

                            });

                        }
                    }
                    catch (Exception ex)
                    {
                        log.Error(this.lottery.Name + " GetLotteryOpenNumberFrom163 解析数据失败", ex);
                    }
                }
                lotteries = lotteries.OrderBy(w => w.QiHao).ToList();
                //log.Info("下一期期号：" + this.NextQiHao + this.lottery.Name + ":" + lotteries.Count + " " + JsonConvert.SerializeObject(lotteries));
                using (var db = new OlaEntities())
                {
                    foreach (var lotteryOpen in lotteries)
                    {
                        try
                        {
                            var lotteryOpenTimes = db.LotteryOpenTimes
                                .FirstOrDefault(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                            if (lotteryOpenTimes != null)
                            {
                                lotteryOpen.OpenTime = lotteryOpenTimes.OpenTime.ToString("yyyy-MM-dd HH:mm:ss");
                                var history = db.LotteryOpenHistories
                                    .Any(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                                if (!history)
                                {
                                    // 预测
                                    GetForecast(db, lotteryOpen);

                                    lotteryOpen.Id = Guid.NewGuid();
                                    lotteryOpen.LotteryId = this.lottery.LotteryId;
                                    lotteryOpen.CreateTime = DateTime.Now;
                                    lotteryOpen.Source = (int)LotteryOpenNumberSourceEnum.网易彩票;

                                    // 获取前三期的预测号码
                                    GetPreForecast(db, lotteryOpen);
                                    db.LotteryOpenHistories.Add(lotteryOpen);
                                    db.SaveChanges();
                                    UpdateWebClientLotteryOpenInfo(lotteryOpen.LotteryId);
                                    var nextInfo = db.LotteryOpenTimes.FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                                    if (nextInfo != null)
                                    {
                                        this.NextQiHao = Convert.ToInt32(nextInfo.QiHao);
                                        this.NextRequestDT = nextInfo.OpenTime;
                                        log.Info("添加：" + this.lottery.Name + " 期号：" + lotteryOpen.QiHao + " 开奖号码:" + lotteryOpen.OpenNumber + " 获取时间: " + DateTime.Now + " 下次获取时间： " + this.NextRequestDT);
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            log.Error(this.lottery.Name + " GetLotteryOpenNumberFrom163 解析数据失败", ex);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(this.lottery.Name + " GetLotteryOpenNumberFrom163 获取数据失败", ex);
            }
        }

        private void GetPreForecast(OlaEntities db, LotteryOpenHistory lotteryOpen)
        {
            var lastes = db.LotteryOpenHistories
                .Where(w => w.LotteryId == this.lottery.LotteryId)
                .OrderByDescending(w => w.QiHao).Take(3).ToList();
            int index = 1;
            foreach (var item in lastes)
            {
                switch (index)
                {
                    case 1:
                        item.Forecast1 = lotteryOpen.OpenNumber;
                        break;
                    case 2:
                        item.Forecast2 = lotteryOpen.OpenNumber;
                        break;
                    case 3:
                        item.Forecast3 = lotteryOpen.OpenNumber;
                        break;
                    default:
                        break;
                }
                index++;
            }
        }

        public void GetLotteryOpenNumberFrom500()
        {
            if (DateTime.Now <= this.NextRequestDT
                || string.IsNullOrEmpty(this.lottery.url500))
            {
                return;
            }
            try
            {
                var url = this.lottery.url500.Replace("{date}", DateTime.Now.ToString("yyyyMMdd"));
                var xDoc = XDocument.Load(url);

                var result = from x in xDoc.Descendants("row")
                             select new LotteryOpenHistory
                             {
                                 OpenNumber = x.Attribute("opencode").Value,
                                 QiHao = this.lottery.Prefix + x.Attribute("expect").Value.Replace("-", ""),
                             };
                result = result.OrderBy(w => w.QiHao);
                using (var db = new OlaEntities())
                {
                    foreach (var lotteryOpen in result)
                    {
                        try
                        {
                            var qihao = Convert.ToInt32(lotteryOpen.QiHao);
                            if (qihao < this.NextQiHao)
                            {
                                continue;
                            }
                            var lotteryOpenTimes = db.LotteryOpenTimes
                                .FirstOrDefault(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                            if (lotteryOpenTimes != null)
                            {
                                lotteryOpen.OpenTime = lotteryOpenTimes.OpenTime.ToString("yyyy-MM-dd HH:mm:ss");
                                var history = db.LotteryOpenHistories
                                    .Any(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                                if (!history)
                                {
                                    // 预测
                                    GetForecast(db, lotteryOpen);

                                    lotteryOpen.CreateTime = DateTime.Now;
                                    lotteryOpen.Id = Guid.NewGuid();
                                    lotteryOpen.LotteryId = this.lottery.LotteryId;
                                    lotteryOpen.Source = (int)LotteryOpenNumberSourceEnum.五百彩票;
                                    // 获取前三期的预测号码
                                    GetPreForecast(db, lotteryOpen);
                                    db.LotteryOpenHistories.Add(lotteryOpen);
                                    db.SaveChanges();
                                    UpdateWebClientLotteryOpenInfo(lotteryOpen.LotteryId);
                                    var nextInfo = db.LotteryOpenTimes.FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                                    if (nextInfo != null)
                                    {
                                        this.NextQiHao = Convert.ToInt32(nextInfo.QiHao);
                                        this.NextRequestDT = nextInfo.OpenTime;
                                        log.Info("添加：" + this.lottery.Name + " 期号：" + lotteryOpen.QiHao + " 开奖号码:" + lotteryOpen.OpenNumber + " 获取时间: " + DateTime.Now + " 下次获取时间： " + this.NextRequestDT);
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            log.Error(this.lottery.Name + " GetLotteryOpenNumberFrom500 解析数据失败", ex);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                log.Error(this.lottery.Name + " GetLotteryOpenNumberFrom500 爬取数据失败", ex);
            }
        }

        public void GetLotteryOpenNumberFromshlottery()
        {
            if (DateTime.Now <= this.NextRequestDT
               || string.IsNullOrEmpty(this.lottery.urlshh))
            {
                return;
            }
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb();
                HtmlWeb.PreRequestHandler handler = delegate (HttpWebRequest request)
                {
                    request.Headers[HttpRequestHeader.AcceptEncoding] = "gzip, deflate";
                    request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
                    request.CookieContainer = new CookieContainer();
                    return true;
                };
                htmlWeb.PreRequest += handler;
                var doc = htmlWeb.Load(this.lottery.urlshh);

                var trs = doc.DocumentNode.SelectNodes("//tr");
                if (trs == null)
                {
                    return;
                }
                trs.RemoveAt(0);
                var lotteries = new List<LotteryOpenHistory>();
                foreach (var tr in trs)
                {
                    try
                    {
                        var tds = tr.ChildNodes;
                        var win_number = tds[1].InnerHtml;
                        var period = tds[0].InnerHtml;
                        if (string.IsNullOrEmpty(win_number) || string.IsNullOrEmpty(period))
                        {
                            continue;
                        }
                        period = this.lottery.Prefix + period;
                        // 过滤掉已经添加的期号
                        var qihao = Convert.ToInt32(period);
                        if (qihao < this.NextQiHao)
                        {
                            continue;
                        }
                        lotteries.Add(new LotteryOpenHistory
                        {
                            OpenNumber = win_number,
                            QiHao = period,
                        });

                    }
                    catch (Exception ex)
                    {
                        log.Error(this.lottery.Name + " GetLotteryOpenNumberFromshlottery 解析数据失败", ex);
                    }
                }
                lotteries = lotteries.OrderBy(w => w.QiHao).ToList();
                //log.Info("下一期期号：" + this.NextQiHao + this.lottery.Name + ":" + lotteries.Count + " " + JsonConvert.SerializeObject(lotteries));
                using (var db = new OlaEntities())
                {
                    foreach (var lotteryOpen in lotteries)
                    {
                        try
                        {
                            var lotteryOpenTimes = db.LotteryOpenTimes
                                .FirstOrDefault(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                            if (lotteryOpenTimes != null)
                            {
                                lotteryOpen.OpenTime = lotteryOpenTimes.OpenTime.ToString("yyyy-MM-dd HH:mm:ss");
                                var history = db.LotteryOpenHistories
                                    .Any(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                                if (!history)
                                {
                                    // 预测
                                    GetForecast(db, lotteryOpen);

                                    lotteryOpen.Id = Guid.NewGuid();
                                    lotteryOpen.LotteryId = this.lottery.LotteryId;
                                    lotteryOpen.CreateTime = DateTime.Now;
                                    lotteryOpen.Source = (int)LotteryOpenNumberSourceEnum.上海彩票网;

                                    // 获取前三期的预测号码
                                    GetPreForecast(db, lotteryOpen);
                                    
                                    db.LotteryOpenHistories.Add(lotteryOpen);
                                    db.SaveChanges();
                                    UpdateWebClientLotteryOpenInfo(lotteryOpen.LotteryId);
                                    var nextInfo = db.LotteryOpenTimes.FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                                    if (nextInfo != null)
                                    {
                                        this.NextQiHao = Convert.ToInt32(nextInfo.QiHao);
                                        this.NextRequestDT = nextInfo.OpenTime;
                                        log.Info("添加：" + this.lottery.Name + " 期号：" + lotteryOpen.QiHao + " 开奖号码:" + lotteryOpen.OpenNumber + " 获取时间: " + DateTime.Now + "：下次获取时间 " + this.NextRequestDT);
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            log.Error(this.lottery.Name + " GetLotteryOpenNumberFromshlottery 解析数据失败", ex);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(this.lottery.Name + " GetLotteryOpenNumberFromshlottery 获取数据失败", ex);
            }
        }

        public void GetLotteryOpenNumberFromgdlottery()
        {
            if (DateTime.Now <= this.NextRequestDT
               || string.IsNullOrEmpty(this.lottery.urlgdlottery))
            {
                return;
            }
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb();
                HtmlWeb.PreRequestHandler handler = delegate (HttpWebRequest request)
                {
                    request.Headers[HttpRequestHeader.AcceptEncoding] = "gzip, deflate";
                    request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
                    request.CookieContainer = new CookieContainer();
                    return true;
                };
                htmlWeb.PreRequest += handler;
                var doc = htmlWeb.Load(this.lottery.urlgdlottery);
                var trs = doc.DocumentNode.SelectNodes("//table[@bordercolorlight='#008000']/tr");
                if (trs == null)
                {
                    return;
                }
                trs.RemoveAt(0);
                trs.RemoveAt(0);

                var lotteries = new List<LotteryOpenHistory>();
                foreach (var tr in trs)
                {
                    try
                    {
                        var tds = tr.ChildNodes;
                        if (tds.Count < 4)
                        {
                            continue;
                        }
                        var period = tds[1].InnerHtml.Trim('\r');
                        var td = tds[3];
                        var spans = td.ChildNodes;
                        if (spans.Count < 2)
                        {
                            continue;
                        }
                        var strongs = spans[1].ChildNodes;
                        if (strongs.Count < 2)
                        {
                            continue;
                        }
                        var win_number = strongs[1].InnerHtml.Replace("\r\n\t", "");
                        win_number = win_number.Replace("\r\n\t", "");
                        win_number = win_number.Replace("   \t", "");
                        win_number = win_number.Trim(' ');
                        win_number = win_number.Replace('，', ',');
                        if (string.IsNullOrEmpty(win_number) || string.IsNullOrEmpty(period))
                        {
                            continue;
                        }
                        period = this.lottery.Prefix + period;
                        // 过滤掉已经添加的期号
                        var qihao = Convert.ToInt32(period);
                        if (qihao < this.NextQiHao)
                        {
                            continue;
                        }
                        lotteries.Add(new LotteryOpenHistory
                        {
                            OpenNumber = win_number,
                            QiHao = period,
                        });

                    }
                    catch (Exception ex)
                    {
                        log.Error(this.lottery.Name + " GetLotteryOpenNumberFromgdlottery 解析数据失败", ex);
                    }
                }
                lotteries = lotteries.OrderBy(w => w.QiHao).ToList();
                //log.Info("下一期期号：" + this.NextQiHao + this.lottery.Name + ":" + lotteries.Count + " " + JsonConvert.SerializeObject(lotteries));
                using (var db = new OlaEntities())
                {
                    foreach (var lotteryOpen in lotteries)
                    {
                        try
                        {
                            var lotteryOpenTimes = db.LotteryOpenTimes
                                .FirstOrDefault(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                            if (lotteryOpenTimes != null)
                            {
                                lotteryOpen.OpenTime = lotteryOpenTimes.OpenTime.ToString("yyyy-MM-dd HH:mm:ss");
                                var history = db.LotteryOpenHistories
                                    .Any(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                                if (!history)
                                {
                                    // 预测
                                    GetForecast(db, lotteryOpen);

                                    lotteryOpen.Id = Guid.NewGuid();
                                    lotteryOpen.LotteryId = this.lottery.LotteryId;
                                    lotteryOpen.CreateTime = DateTime.Now;
                                    lotteryOpen.Source = (int)LotteryOpenNumberSourceEnum.广东体彩网;

                                    // 获取前三期的预测号码
                                    GetPreForecast(db, lotteryOpen);
                                    db.LotteryOpenHistories.Add(lotteryOpen);
                                    db.SaveChanges();
                                    UpdateWebClientLotteryOpenInfo(lotteryOpen.LotteryId);
                                    var nextInfo = db.LotteryOpenTimes.FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                                    if (nextInfo != null)
                                    {
                                        this.NextQiHao = Convert.ToInt32(nextInfo.QiHao);
                                        this.NextRequestDT = nextInfo.OpenTime;
                                        log.Info("添加：" + this.lottery.Name + " 期号：" + lotteryOpen.QiHao + " 开奖号码:" + lotteryOpen.OpenNumber + " 获取时间: " + DateTime.Now + "：下次获取时间 " + this.NextRequestDT);
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            log.Error(this.lottery.Name + " GetLotteryOpenNumberFromgdlottery 解析数据失败", ex);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(this.lottery.Name + " GetLotteryOpenNumberFromgdlottery 获取数据失败", ex);
            }
        }

        public void GetLotteryOpenNumberFromkm28()
        {
            if (DateTime.Now <= this.NextRequestDT
               || string.IsNullOrEmpty(this.lottery.urlkm28))
            {
                return;
            }
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb();
                HtmlWeb.PreRequestHandler handler = delegate (HttpWebRequest request)
                {
                    request.Headers[HttpRequestHeader.AcceptEncoding] = "gzip, deflate";
                    request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;
                    request.CookieContainer = new CookieContainer();
                    return true;
                };
                htmlWeb.PreRequest += handler;
                var url = this.lottery.urlkm28.Replace("{date}", DateTime.Now.ToString("yyyy-MM-dd"));
                var doc = htmlWeb.Load(url);
                var trs = doc.DocumentNode.SelectNodes("//table[@class='tac fl']/tr");

                var lotteries = new List<LotteryOpenHistory>();
                foreach (var tr in trs)
                {
                    try
                    {
                        var tds = tr.SelectNodes("./td");
                        if (tds == null || tds.Count != 3)
                        {
                            continue;
                        }

                        var period = tds[0].InnerText;
                        if (string.IsNullOrEmpty(period))
                        {
                            continue;
                        }
                        var win_number = tds[2].InnerText;
                        if (string.IsNullOrEmpty(win_number))
                        {
                            continue;
                        }
                        win_number = win_number.Replace(" ", ",");
                        period = DateTime.Now.ToString("yyyyMMdd") + period;
                        // 过滤掉已经添加的期号
                        var qihao = Convert.ToInt32(period);
                        if (qihao < this.NextQiHao)
                        {
                            continue;
                        }
                        lotteries.Add(new LotteryOpenHistory
                        {
                            OpenNumber = win_number,
                            QiHao = period,
                        });

                    }
                    catch (Exception ex)
                    {
                        log.Error(this.lottery.Name + " GetLotteryOpenNumberFromkm28 解析数据失败", ex);
                    }
                }

                lotteries = lotteries.OrderBy(w => w.QiHao).ToList();
                //log.Info("下一期期号：" + this.NextQiHao + this.lottery.Name + ":" + lotteries.Count + " " + JsonConvert.SerializeObject(lotteries));
                using (var db = new OlaEntities())
                {
                    foreach (var lotteryOpen in lotteries)
                    {
                        try
                        {
                            var lotteryOpenTimes = db.LotteryOpenTimes
                                .FirstOrDefault(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                            if (lotteryOpenTimes != null)
                            {
                                lotteryOpen.OpenTime = lotteryOpenTimes.OpenTime.ToString("yyyy-MM-dd HH:mm:ss");
                                var history = db.LotteryOpenHistories
                                    .Any(w => w.LotteryId == this.lottery.LotteryId && w.QiHao == lotteryOpen.QiHao);
                                if (!history)
                                {
                                    // 预测
                                    GetForecast(db, lotteryOpen);

                                    lotteryOpen.Id = Guid.NewGuid();
                                    lotteryOpen.LotteryId = this.lottery.LotteryId;
                                    lotteryOpen.CreateTime = DateTime.Now;
                                    lotteryOpen.Source = (int)LotteryOpenNumberSourceEnum.开门彩;
                                    // 获取前三期的预测号码
                                    GetPreForecast(db, lotteryOpen);
                                    db.LotteryOpenHistories.Add(lotteryOpen);
                                    db.SaveChanges();
                                    UpdateWebClientLotteryOpenInfo(lotteryOpen.LotteryId);
                                    var nextInfo = db.LotteryOpenTimes.FirstOrDefault(w => w.LotteryId == lotteryOpen.LotteryId && w.QiHao == lotteryOpenTimes.NextQiHao);
                                    if (nextInfo != null)
                                    {
                                        this.NextQiHao = Convert.ToInt32(nextInfo.QiHao);
                                        this.NextRequestDT = nextInfo.OpenTime;
                                        log.Info("添加：" + this.lottery.Name + " 期号：" + lotteryOpen.QiHao + " 开奖号码:" + lotteryOpen.OpenNumber + " 获取时间: " + DateTime.Now + "：下次获取时间 " + this.NextRequestDT);
                                    }
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            log.Error(this.lottery.Name + " GetLotteryOpenNumberFromgdlottery 解析数据失败", ex);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                log.Error(this.lottery.Name + " GetLotteryOpenNumberFromgdlottery 获取数据失败", ex);
            }
        }

        private string Except2String(List<int> except)
        {
            var result = "";
            foreach (var n in except)
            {
                if (n < 10)
                {
                    result += "0" + n + ",";
                }
                else
                {
                    result += n + ",";
                }
            }
            return result.Substring(0, result.Length - 1);
        }

        private void GetForecast(OlaEntities db, LotteryOpenHistory lotteryOpen)
        {
            var forecast = ForecastA(db, lotteryOpen) + ";";
            forecast += ForecastB(db, lotteryOpen) + ";";
            forecast += ForecastC(db, lotteryOpen);
            lotteryOpen.CurrentForecastNumber = forecast;
        }

        private string ForecastA(OlaEntities db, LotteryOpenHistory lottery)
        {
            var olds = db.LotteryOpenHistories
                .Where(w => w.LotteryId == this.lottery.LotteryId)
                .OrderByDescending(w => w.QiHao)
                .Take(50).ToList();
            var currentOpenNumbers = SplitOpenNumber2IntList(lottery.OpenNumber);
            foreach (var item in olds)
            {
                var openNumbers = SplitOpenNumber2IntList(item.OpenNumber);
                var intersect = currentOpenNumbers.Intersect(openNumbers);

                if (intersect.Count() == 4)
                {
                    lottery.ForecastFrom += item.QiHao + ";";
                    //log.Info(" 预测A：" + JsonConvert.SerializeObject(item));
                    var except = new List<int>();
                    except.AddRange(openNumbers.Except(currentOpenNumbers));
                    except.AddRange(currentOpenNumbers.Except(openNumbers));
                    return Except2String(except);
                }
            }
            lottery.ForecastFrom += ";";
            return null;
        }

        //    //1
        //    var a = new List<string> { "2", "4", "5", "8", "10" };
        //    var b = new List<string> { "2", "3", "4", "5", "10" };
        //    // ab交集
        //    var c = a.Intersect(b);
        //    var d = new List<string>();
        //        // 匹配四位
        //        if (c.Count() == 4)
        //        {
        //            // 合并AUB-AnB = An(AUB)+Bn(AUB)= B\A+A\B
        //            d.AddRange(b.Except(a));
        //            d.AddRange(a.Except(b));                
        //        }
        //ConsoleHelper.ConsoleInfo(d);

        //        //2
        //        // 当前期a每一位都减一
        //        var e = new List<string> { "1", "3", "4", "7", "9" };
        ////向上按一的算法进行匹配 
        //var f = new List<string> { "1", "3", "7", "9", "10" };
        //// 匹配到以后每一位都加一
        //var g = new List<string> { "2", "4", "8", "10", "11" };
        ////重复1 找结果
        //// 5 11

        ////3 前二
        private string ForecastB(OlaEntities db, LotteryOpenHistory lottery)
        {
            var olds = db.LotteryOpenHistories
                .Where(w => w.LotteryId == this.lottery.LotteryId)
                .OrderByDescending(w => w.QiHao)
                .Take(50).ToList();
            var currentOpenNumbers = SplitOpenNumber2IntList(lottery.OpenNumber);
            var currentOpenNumbers_minus = new List<int>();
            foreach (var item in currentOpenNumbers)
            {
                currentOpenNumbers_minus.Add(item - 1 == 0 ? 11 : item - 1);
            }
            //log.Info("B-1:01 " + string.Join(",", currentOpenNumbers_minus));

            foreach (var item in olds)
            {
                var openNumbers = SplitOpenNumber2IntList(item.OpenNumber);
                var intersect = currentOpenNumbers_minus.Intersect(openNumbers);

                if (intersect.Count() != 4)
                {
                    continue;
                }
                lottery.ForecastFrom += item.QiHao + ";";
                //log.Info(item.QiHao + " B匹配：02 " + item.OpenNumber);
                var currentOpenNumbers_plus = new List<int>();
                foreach (var n in openNumbers)
                {
                    currentOpenNumbers_plus.Add(n + 1 == 12 ? 1 : n + 1);
                }
                //log.Info(" B + 1：03 " + string.Join(",", currentOpenNumbers_plus));
                var except = new List<int>();
                except.AddRange(currentOpenNumbers_plus.Except(currentOpenNumbers));
                return Except2String(except);

            }
            lottery.ForecastFrom += ";";
            return null;
        }

        /// <summary>
        /// 前二预测
        /// 历史数据加一 有一位重合 则为匹配成功
        /// 
        /// </summary>
        /// <param name="db"></param>
        /// <param name="openNumber"></param>
        /// <returns></returns>
        private string ForecastC(OlaEntities db, LotteryOpenHistory lottery)
        {
            var olds = db.LotteryOpenHistories
                .Where(w => w.Used != true && w.LotteryId == this.lottery.LotteryId)
                .OrderByDescending(w => w.QiHao)
                .Take(50).ToList();
            var currentOpenNumbers = SplitOpenNumber2IntList(lottery.OpenNumber.Substring(0, 5));
            foreach (var item in olds)
            {
                var openNumbers = SplitOpenNumber2IntList(item.OpenNumber.Substring(0, 5));
                var currentOpenNumbers_plus = new List<int>();
                foreach (var n in openNumbers)
                {
                    currentOpenNumbers_plus.Add(n + 1 == 12 ? 1 : n + 1);
                }
                var intersect = currentOpenNumbers.Intersect(currentOpenNumbers_plus);

                if (intersect.Count() == 1)
                {
                    lottery.ForecastFrom += item.QiHao;
                    //log.Info(item.QiHao + " 预测C：" + JsonConvert.SerializeObject(item));
                    var except = new List<int>();
                    except.AddRange(currentOpenNumbers_plus.Except(currentOpenNumbers));
                    item.Used = true;
                    item.UsedBy = lottery.QiHao;
                    db.SaveChanges();
                    return Except2String(except);
                }
            }
            return null;
        }
        /// <summary>
        /// 将开奖号码以逗号分割，并转换为整数数组
        /// </summary>
        /// <param name="openNumber"></param>
        /// <returns></returns>
        private List<int> SplitOpenNumber2IntList(string openNumber)
        {
            var numbers_str = openNumber.Split(',', ',', '，');

            var numbers = new List<int>();
            foreach (var item in numbers_str)
            {
                numbers.Add(Convert.ToInt32(item));
            }
            return numbers;
        }

        /// <summary>
        /// 更新客户端开奖信息
        /// </summary>
        private void UpdateWebClientLotteryOpenInfo(int lotteryId)
        {
            var wc = new WebClient
            {
                Encoding = Encoding.UTF8
            };

            var nv = new NameValueCollection
            {
                { "LotteryId", lotteryId.ToString() }
            };

            wc.UploadValuesTaskAsync("http://bjdiil.top/Home/GetNewOpenNumber", nv);
        }
    }
}
