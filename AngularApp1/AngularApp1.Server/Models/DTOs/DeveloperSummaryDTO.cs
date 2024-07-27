namespace AngularApp1.Server.Models.DTOs
{
    public record DeveloperSummaryDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Country { get; set; }
    }
}
