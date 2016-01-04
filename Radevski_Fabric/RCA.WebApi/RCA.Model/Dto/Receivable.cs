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
        public int fruitType { get; set; }
        public int binType { get; set; }
        public int numBin { get; set; }
        public bool customerBin { get; set; }
    }

    public class items
    {
        public int fruitCate { get; set; }
        public int fruitType { get; set; }
        public int binType { get; set; }
        public int numBin { get; set; }
        public bool customerBin { get; set; }
    }
}
