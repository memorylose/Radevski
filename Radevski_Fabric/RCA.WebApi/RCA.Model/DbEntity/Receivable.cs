using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("Customization")]
    public class Customization
    {
        public int Id { get; set; }
        public string DropId { get; set; }
        public int CurrentLocation { get; set; }
        public int Source { get; set; }
        public int BinTotal { get; set; }
        public DateTime DeliverDate { get; set; }
        public string Comments { get; set; }
    }

    [Table("Receivable")]
    public class Receivable
    {
        public int Id { get; set; }
        public int CustomizationId { get; set; }
        public int Fruit { get; set; }
        public int BinType { get; set; }
        public int BinCount { get; set; }
        public bool IsCustomer { get; set; }
    }
}
