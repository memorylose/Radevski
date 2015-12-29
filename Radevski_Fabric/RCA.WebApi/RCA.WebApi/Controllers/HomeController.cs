using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace RCA.WebApi.Controllers
{
    public class HomeController : ApiController
    {
        public string GetDropID()
        {
            //TODO NEED TO KNOW THE LOGIC
            return "001";
        }

        [System.Web.Http.HttpPost]
        public bool CreateReceivable([FromBody]dynamic items)
        {
            string test = Convert.ToString(items);
            ManulaList deBlogList = JsonConvert.DeserializeObject<ManulaList>(test);
            //string test = items;
            return true;
        }
    }
    public class ManulaList
    {
        public List<items> items { get; set; }
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