using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("Asset")]
    public class Asset
    {
        public int Id { get; set; }
        public int CustomizationId { get; set; }
        public int Direction { get; set; }
        public int BinType { get; set; }
        public int BinCount { get; set; }
        public bool IsCustomer { get; set; }
    }
}
