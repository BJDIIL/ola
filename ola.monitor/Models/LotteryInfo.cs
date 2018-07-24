namespace ola.monitor.Models
{
    public class LotteryInfo
    {
        public string Name { get; set; }
        public int LotteryId { get; internal set; }

        /// <summary>
        /// 网易彩票
        /// </summary>
        public string url163 { get; set; }
        /// <summary>
        /// 500万彩票网
        /// </summary>
        public string url500 { get; set; }
        //上海体彩网
        public string urlshh { get; set; }
        /// <summary>
        /// 广东体彩网
        /// </summary>
        public string urlgdlottery { get; set; }

        public string Prefix { get; set; }

        ////http://tv.icaile.com/index.html
        ///// <summary>
        ///// 爱彩乐
        ///// </summary>
        //public string urlicaile { get; set; }

        //https://www.km28.com
        /// <summary>
        /// 开门彩
        /// </summary>
        public string urlkm28 { get; set; }
    }
}
