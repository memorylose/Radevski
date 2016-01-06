using System.ComponentModel.DataAnnotations.Schema;

namespace Radevski.Models.DbEntity
{
    [Table("SourceType")]
    public class LocationType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
    }

    [Table("Source")]
    public class Location
    {
        public int Id { get; set; }
        public int TypeId { get; set; }
        public string LocationName { get; set; }
    }

    [Table("ReceiverLocation")]
    public class ReceiverLocation
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
