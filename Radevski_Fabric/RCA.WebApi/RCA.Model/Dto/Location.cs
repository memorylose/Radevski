namespace RCA.Model.Dto
{
    public class Location
    {
        public int LocationId { get; set; }
        public int LocationTypeId { get; set; }
        public string LocationType { get; set; }
        public string LocationName { get; set; }
    }

    public class ReceiverLocation
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
