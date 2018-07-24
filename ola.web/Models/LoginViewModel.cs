using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ola.web.Models
{
    public class LoginViewModel
    {
        public string UserName { get; set; }

        public string Pwd { get; set; }

        public string Vcode { get; set; }
    }
}