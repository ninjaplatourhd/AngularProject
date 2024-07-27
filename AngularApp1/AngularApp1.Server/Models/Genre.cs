namespace AngularApp1.Server.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public List<Game> Games { get; } = new List<Game>();
    }
}
