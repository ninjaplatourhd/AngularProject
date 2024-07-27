namespace AngularApp1.Server.Models.DTOs
{
    public record GenreSummaryDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
