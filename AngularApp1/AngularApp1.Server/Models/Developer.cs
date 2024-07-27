namespace AngularApp1.Server.Models
{
    public class Developer
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Country { get; set; }

        public List<Game> Games { get; } = [];

    }
}
