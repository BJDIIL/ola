using ola.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ola.console
{
    public class cqsscGenerator : BaseGenerator
    {
        public cqsscGenerator()
        {
            this.LotteryId = 1;
            this.LotteryName = "重庆时时彩";
            this.MaxQiHao = 120;
            this.MinQiHao = 1;
            this.QiHaoFormat = "d3";
        }
        public override void Start()
        {
            try
            {
                var startTime = DateTime.Now.Date;
                Console.WriteLine("请输入要生成多少天的数据：");
                int.TryParse(Console.ReadLine(), out int days);
                if (days == 0)
                {
                    return;
                }
                var endTime = startTime.AddDays(days);
                while (startTime < endTime)
                {
                    Console.WriteLine(startTime.ToString("yyyy-MM-dd"));
                    Console.Write("\r");
                    GenerateOneDay(startTime);
                    startTime = startTime.AddDays(1);
                }
            }
            catch (Exception ex)
            {
                log.Error(ex);
            }
        }

        /// <summary>
        /// 生成一天的开奖时间
        /// </summary>
        /// <param name="date"></param>
        private void GenerateOneDay(DateTime date)
        {
            // 00：05 -- 02：00
            var startTime = new DateTime(date.Year, date.Month, date.Day, 0, 5, 0);
            var endTime = new DateTime(date.Year, date.Month, date.Day, 2, 0, 0);
            Generate(startTime, endTime, 5, this.MinQiHao);
            // 10：00 -- 22：00
            startTime = new DateTime(date.Year, date.Month, date.Day, 10, 0, 0);
            endTime = new DateTime(date.Year, date.Month, date.Day, 22, 10, 0);
            Generate(startTime, endTime, 10, 24);

            // 22：05 -- 00：00
            startTime = new DateTime(date.Year, date.Month, date.Day, 22, 5, 0);
            var nextDay = date.AddDays(1);
            endTime = new DateTime(nextDay.Year, nextDay.Month, nextDay.Day, 0, 0, 0);
            Generate(startTime, endTime, 5, 97);
            // 第 120 期
            using (var db = new OlaEntities())
            {
                db.LotteryOpenTimes.Add(new LotteryOpenTime
                {
                    CreateTime = DateTime.Now,
                    Id = Guid.NewGuid(),
                    LotteryId = this.LotteryId,
                    NextQiHao = date.ToString("yyyyMMdd") + this.MinQiHao.ToString(this.QiHaoFormat),
                    PreQiHao = date.AddDays(-1).ToString("yyyyMMdd") + (this.MaxQiHao - 1).ToString(this.QiHaoFormat),
                    OpenTime = date,
                    QiHao = date.AddDays(-1).ToString("yyyyMMdd") + this.MaxQiHao.ToString(this.QiHaoFormat),
                    StartTime = date.AddMinutes(-5).AddSeconds(-30),
                    EndTime = date.AddSeconds(-30),
                });
                db.SaveChanges();
            }
        }

        private void Generate(DateTime startTime, DateTime endTime, int step, int startQiHao)
        {
            using (var db = new OlaEntities())
            {
                while (startTime < endTime)
                {
                    string qihao = startTime.ToString("yyyyMMdd") + startQiHao.ToString(this.QiHaoFormat);
                    var exists = db.LotteryOpenTimes.Any(w => w.LotteryId == this.LotteryId && w.QiHao == qihao);
                    if (exists)
                    {
                        startQiHao++;
                        startTime = startTime.AddMinutes(step);
                        continue;
                    }

                    string next_qihao = startTime.ToString("yyyyMMdd") + (startQiHao + 1).ToString(this.QiHaoFormat);
                    if (startQiHao + 1 > this.MaxQiHao)
                    {
                        next_qihao = startTime.AddDays(1).ToString("yyyyMMdd") + 1.ToString(this.QiHaoFormat);
                    }

                    string pre_qihao = startTime.ToString("yyyyMMdd") + (startQiHao - 1).ToString(this.QiHaoFormat);
                    if (startQiHao - 1 == 0)
                    {
                        pre_qihao = startTime.AddDays(-1).ToString("yyyyMMdd") + 120.ToString(this.QiHaoFormat);
                    }

                    db.LotteryOpenTimes.Add(new LotteryOpenTime
                    {
                        CreateTime = DateTime.Now,
                        Id = Guid.NewGuid(),
                        LotteryId = this.LotteryId,
                        NextQiHao = next_qihao,
                        PreQiHao = pre_qihao,
                        OpenTime = startTime,
                        QiHao = qihao,
                        StartTime = (startQiHao == 24 ? startTime.AddHours(-4) : startTime.AddMinutes(-step)).AddSeconds(-30),
                        EndTime = startTime.AddSeconds(-30),
                    });

                    startQiHao++;
                    startTime = startTime.AddMinutes(step);
                }
                db.SaveChanges();
            }
        }

        public override void Dispose()
        {
            db.Dispose();
        }
    }
}
