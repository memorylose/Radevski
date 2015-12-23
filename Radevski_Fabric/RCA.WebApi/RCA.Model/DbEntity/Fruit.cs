using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("FruitCategory")]
    public class FruitCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
    }

    [Table("Fruit")]
    public class Fruit
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string FruitName { get; set; }
    }
}
