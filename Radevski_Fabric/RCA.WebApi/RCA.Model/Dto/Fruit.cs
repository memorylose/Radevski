using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCA.Model.Dto
{
    public class Fruit
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string FruitName { get; set; }
        //Use for fruit edit
        public int CatId { get; set; }
    }
}
