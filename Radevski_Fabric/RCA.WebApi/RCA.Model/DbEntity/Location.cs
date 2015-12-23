using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("LocationType")]
    public class LocationType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
    }

    [Table("Location")]
    public class Location
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public string LocationName { get; set; }
    }
}
