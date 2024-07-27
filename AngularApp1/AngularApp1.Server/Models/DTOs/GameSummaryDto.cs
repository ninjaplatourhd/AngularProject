using System.ComponentModel.DataAnnotations.Schema;

namespace AngularApp1.Server.Models.DTOs
{
    public record  GameSummaryDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required decimal Price { get; set; }
        public required string Genre { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public List<string> Developers { get; set; } = [];
        public string Description { get; set; } = "";
        public string ImagePath { get; set; } = "";
        public string BannerPath { get; set; } = "";
    }
}
