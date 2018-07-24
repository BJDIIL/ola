using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ola.web.Models
{
    public class RegisterModel
    {
        public string Mobile { get; set; }
        public string Vcode { get; set; }
        public string AuthCode { get; set; }
        public string OpenId { get; set; }
    }
}