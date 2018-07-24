using ola.model;
using ola.web.Configs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ola.web.Helpers
{
    public class LotteryHelper
    {
        private static readonly OlaEntities db = new OlaEntities();
        public static string Generate(int lotteryId)
        {
            var sb = new StringBuilder();
            var data = GetPageOfData(lotteryId);

            foreach (var item in data)
            {
                sb.Append("    <div class=\"weui-grids\">");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <p class=\"weui-grid__label\">" + item.QiHao + "</p>");
                sb.Append("        </div>");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <p class=\"weui-grid__label\">" + item.OpenNumber + "</p>");
                sb.Append("        </div>");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <p class=\"weui-grid__label\">" + item.CurrentForecastNumber + "</p>");
                sb.Append("        </div>");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <div class=\"weui-grid__label\">" + item.Forecast1 + "</div>");
                sb.Append("        </div>");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <div class=\"weui-grid__label\">" + item.Forecast2 + "</div>");
                sb.Append("        </div>");
                sb.Append("        <div class=\"weui-grid\">");
                sb.Append("            <div class=\"weui-grid__label\">" + item.Forecast3 + "</div>");
                sb.Append("        </div>");
                sb.Append("    </div>");
            }
            return sb.ToString();

        }

        public static List<LotteryOpenHistory> GetPageOfData(int lotteryId)
        {
            var data = db.LotteryOpenHistories
               .Where(w => w.LotteryId == lotteryId)
               .OrderByDescending(w => w.QiHao)
               .Take(WebConfigs.PageSize).AsNoTracking().ToList();

            foreach (var item in data)
            {
                // 开奖号码格式整理
                item.OpenNumber = item.OpenNumber.Replace(",", " ");
                // 预测号码格式整理  去重
                var nums = item.CurrentForecastNumber.Split(';');
                if (nums[0].Length == 5)
                {
                    item.CurrentForecastNumber = item.CurrentForecastNumber.Replace(item.CurrentForecastNumber.Substring(2, 4), ",");
                }
                var CurrentForecastNumbers = item.CurrentForecastNumber.Replace(";", ",").Split(',').ToList();
                CurrentForecastNumbers.RemoveAll(w => w == "");
                CurrentForecastNumbers = CurrentForecastNumbers.Distinct().ToList();
                item.CurrentForecastNumber = string.Join(" ", CurrentForecastNumbers.Distinct());

                // 未来三期开奖号码格式整理 以颜色进行区分 
                item.Forecast1 = FormatForecast(CurrentForecastNumbers, item.Forecast1);
                item.Forecast2 = FormatForecast(CurrentForecastNumbers, item.Forecast2);
                item.Forecast3 = FormatForecast(CurrentForecastNumbers, item.Forecast3);
            }
            return data;

        }


        public static string FormatForecast(List<string> currentForecastNumbers, string forecast)
        {
            var result = "<label>--</label>";
            if (string.IsNullOrEmpty(forecast))
            {
                return result;
            }
            var numbers = forecast.Split(',');
            result = "";
            foreach (var item in numbers)
            {
                if (currentForecastNumbers.Contains(item))
                {
                    result += "<label style='color:red;'>" + item + " </label>";
                }
                else
                {
                    result += item + " ";
                }
            }
            return result;
        }
    }
}