using log4net;
using ola.model;
using ola.monitor.GetLotteryOpenNumbers;
using ola.monitor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ola.monitor
{
    public partial class GetOpenNumberForm : Form
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(GetOpenNumberForm));

        private List<LotteryInfo> lotteryInfos = null;
        private List<LotteryOpenHistory> LastLotteryOpenHistories = null;
        private List<IGetLotteryOpenNumber> GetLotteries = null;
        private bool needUpdate = false;
        public GetOpenNumberForm()
        {
            InitializeComponent();
        }

        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            InitData();
            this.SizeChanged += GetOpenNumberForm_SizeChanged;
            getOpenNumbertimer.Enabled = true;
            getOpenNumbertimer.Interval = 1000 * 10;
            getOpenNumbertimer.Start();
            GetOpenNumbertimer_Tick(null, null);
        }

        private void InitData()
        {
            this.LastLotteryOpenHistories = new List<LotteryOpenHistory>();
            lotteryInfos = new List<LotteryInfo>
            {
                //new LotteryInfo{ Name = "重庆时时彩", LotteryId = 1, },
                new LotteryInfo{
                    Prefix ="20",
                    Name = "山东11选5",
                    LotteryId = 2,
                    url163 ="http://caipiao.163.com/award/11xuan5/",
                    urlkm28 ="https://www.km28.com/lottery-gp/sdxyxw/{date}.html",
                },

                new LotteryInfo{
                    Prefix ="20",
                    Name = "广东11选5",
                    LotteryId = 3,
                    url163 ="http://caipiao.163.com/award/gd11xuan5/",
                    urlgdlottery = "http://www.gdlottery.cn/odata/zst11xuan5.jspx",
                    urlkm28 ="https://www.km28.com/lottery-gp/gdsyxu/{date}.html",
                    url500 ="http://kaijiang.500.com/static/info/kaijiang/xml/gdsyxw/{date}.xml",
                    
                },

                new LotteryInfo{
                    Prefix ="",
                    Name = "上海11选5",
                    LotteryId = 4 ,
                    urlshh = "http://caipiao.gooooal.com/shtc!bc115.action",
                    urlkm28 ="https://www.km28.com/lottery-gp/shsyxw/{date}.html",
                    url500 ="http://kaijiang.500.com/static/info/kaijiang/xml/shhsyxw/{date}.xml",
                },
            };
            GetLotteries = new List<IGetLotteryOpenNumber>();
            foreach (var lottery in lotteryInfos)
            {
                IGetLotteryOpenNumber getter = new GetLotteryOpenNumber(lottery);
                GetLotteries.Add(getter);
            }
        }

        private void GetOpenNumbertimer_Tick(object sender, EventArgs e)
        {
            //log.Info("GetOpenNumbertimer_Tick");
            foreach (var getter in this.GetLotteries)
            {
                getter.GetLotteryOpenNumberFrom163();
                getter.GetLotteryOpenNumberFromshlottery();
                getter.GetLotteryOpenNumberFromgdlottery();
                getter.GetLotteryOpenNumberFromkm28();
                getter.GetLotteryOpenNumberFrom500();
            }
            UpdateOpenNumber();
        }


        /// <summary>
        /// 更新开奖号码
        /// </summary>
        public void UpdateOpenNumber()
        {
            using (var db = new OlaEntities())
            {
                foreach (var item in lotteryInfos)
                {
                    var lottery = db.LotteryOpenHistories
                        .Where(w => w.LotteryId == item.LotteryId)
                        .OrderByDescending(w => w.QiHao)
                        .FirstOrDefault();

                    if (lottery != null)
                    {
                        // 未更新
                        if (LastLotteryOpenHistories.Any(w => w.LotteryId == lottery.LotteryId && w.QiHao == lottery.QiHao))
                        {
                            continue;
                        }
                        needUpdate = true;
                        var lastLotteryOpenHistory = LastLotteryOpenHistories.FirstOrDefault(w => w.LotteryId == lottery.LotteryId);
                        if (lastLotteryOpenHistory != null)
                        {
                            lastLotteryOpenHistory.CreateTime = lottery.CreateTime;
                            lastLotteryOpenHistory.OpenNumber = lottery.OpenNumber;
                            lastLotteryOpenHistory.OpenTime = lottery.OpenTime;
                            lastLotteryOpenHistory.QiHao = lottery.QiHao;
                        }
                        else
                        {
                            LastLotteryOpenHistories.Add(lottery);
                        }
                    }
                }
            }
            if (needUpdate)
            {
                try
                {
                    int columns = 5;
                    this.Controls.Clear();
                    int width = this.Width / columns;
                    AddControls("彩种", width, this.Width * 0 / columns, 10);
                    AddControls("期号", width, this.Width * 1 / columns, 10);
                    AddControls("开奖号码", width, this.Width * 2 / columns, 10);
                    AddControls("开奖时间", width, this.Width * 3 / columns, 10);
                    AddControls("获取时间", width, this.Width * 4 / columns, 10);

                    int row = 1;
                    int height = 35;
                    int y = 0;
                    foreach (var item in lotteryInfos)
                    {
                        row++;
                        y = row * height;
                        var last = LastLotteryOpenHistories
                            .FirstOrDefault(w => w.LotteryId == item.LotteryId);
                        if (last != null)
                        {
                            AddControls(item.Name, width, this.Width * 0 / columns, y);
                            AddControls(last.QiHao, width, this.Width * 1 / columns, y);
                            AddControls(last.OpenNumber, width, this.Width * 2 / columns, y);
                            AddControls(last.OpenTime.Substring(5), width, this.Width * 3 / columns, y);
                            AddControls(last.CreateTime.ToString("MM-dd HH:mm:ss"), width, this.Width * 4 / columns, y);
                        }
                    }
                }
                catch (Exception ex)
                {
                    log.Error(ex);
                }
            }

            needUpdate = false;
        }

        private void AddControls(string text, int width, int x, int y)
        {
            float fontSize = 12f;
            var label = new Label
            {
                Text = text,
                Font = new System.Drawing.Font("宋体", fontSize),
                Width = width,
                Location = new System.Drawing.Point(x, y),
            };
            this.Controls.Add(label);
        }

        private void GetOpenNumberForm_SizeChanged(object sender, EventArgs e)
        {
            needUpdate = true;
            UpdateOpenNumber();
        }


    }
}
