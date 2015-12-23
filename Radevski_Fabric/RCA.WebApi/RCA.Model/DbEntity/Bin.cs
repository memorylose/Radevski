using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("BinType")]
    public class BinType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
    }
}
