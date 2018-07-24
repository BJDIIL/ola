using ola.model;
using System;
using System.Linq;

namespace ola.console
{
    public class gdsyxwGenerator : BaseGenerator
    {
        public gdsyxwGenerator()
        {
            this.LotteryId = 3;
            this.LotteryName = "广东11选5";
            this.MaxQiHao = 84;
            this.MinQiHao = 1;
            this.QiHaoFormat = "d2";
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
            // 09：00 -- 23：00
            var startTime = new DateTime(date.Year, date.Month, date.Day, 9, 10, 0);
            var endTime = new DateTime(date.Year, date.Month, date.Day, 23, 00, 0);
            Generate(startTime, endTime, 10, 1);
        }

        private void Generate(DateTime startTime, DateTime endTime, int step, int startQiHao)
        {
            using (var db = new OlaEntities())
            {
                while (startTime <= endTime)
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
                        next_qihao = startTime.AddDays(1).ToString("yyyyMMdd") + this.MinQiHao.ToString(this.QiHaoFormat);
                    }

                    string pre_qihao = startTime.ToString("yyyyMMdd") + (startQiHao - 1).ToString(this.QiHaoFormat);
                    if (startQiHao - 1 == 0)
                    {
                        pre_qihao = startTime.AddDays(-1).ToString("yyyyMMdd") + this.MaxQiHao.ToString(this.QiHaoFormat);
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
                        StartTime = startTime.AddMinutes(-step).AddSeconds(-30),
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
