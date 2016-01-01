using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCA.Model.Dto
{
    public class Receivable
    {
        public string dropid { get; set; }
        public List<items> manualist { get; set; }
        public int locationId { get; set; }
        public int sourceId { get; set; }
        public int binTotal { get; set; }
        public string comments { get; set; }
        public string myDate { get; set; }
    }

    public class items
    {
        public string fruitCate { get; set; }
        public string fruitType { get; set; }
        public string binType { get; set; }
        public string numBin { get; set; }
        public string customerBin { get; set; }
    }
}
