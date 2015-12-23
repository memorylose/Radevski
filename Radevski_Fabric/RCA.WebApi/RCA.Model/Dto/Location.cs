using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCA.Model.Dto
{
    public class Location
    {
        public int LocationId { get; set; }
        public int LocationTypeId { get; set; }
        public string LocationType { get; set; }
        public string LocationName { get; set; }
    }
}
