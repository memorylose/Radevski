using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCA.Model.Dto
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsRemember { get; set; }
        public string Email { get; set; }
    }
}
