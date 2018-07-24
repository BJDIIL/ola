using log4net;
using ola.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ola.console
{
    public abstract class BaseGenerator : IGenerator, IDisposable
    {
        protected static readonly ILog log = LogManager.GetLogger(typeof(BaseGenerator));
        protected OlaEntities db = null;
        protected string LotteryName;
        protected int LotteryId;
        protected int MaxQiHao;
        protected int MinQiHao;
        protected string QiHaoFormat;
        public abstract void Start();

        public abstract void Dispose();

        public BaseGenerator()
        {
            db = new OlaEntities();
        }
    }
}
