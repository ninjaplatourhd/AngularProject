using System.ComponentModel.DataAnnotations.Schema;

namespace AngularApp1.Server.Models
{
    public class Game
    {
        public int GameID { get; set; }
        public required string Name { get; set; }

        [Column(TypeName = "decimal(4,2)")]
        public required decimal Price { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; } = null!;
        public DateOnly ReleaseDate { get; set; }
        public List<Developer> Developers { get; } = [];

        public string ImagePath { get; set; } = "";

        public string BannerPath { get; set; } = "";

        public string Description { get; set; } = "";
    }
}
