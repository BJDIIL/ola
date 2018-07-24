using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ola.console
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.WriteLine("请输入指令:");
                Console.WriteLine("1. 生成 重庆时时彩 开奖时间记录");
                Console.WriteLine("2. 生成 山东11选5 开奖时间记录");
                Console.WriteLine("3. 生成 广东11选5 开奖时间记录");
                Console.WriteLine("4. 生成 上海11选5 开奖时间记录");
                int command = 0;
                int.TryParse(Console.ReadLine(), out command);
                IGenerator generator = null;
                switch (command)
                {
                    case 1:
                        generator = new cqsscGenerator();
                        break;
                    case 2:
                        generator = new shdsyxwGenerator();
                        break;
                    case 3:
                        generator = new gdsyxwGenerator();
                        break;
                    case 4:
                        generator = new shhsyxwGenerator();
                        break;
                    default:
                        break;
                }

                if (null != generator)
                {
                    generator.Start();
                }
            }


        }
    }
}
