namespace AngularApp1.Server.Models.DTOs
{
    public record DeveloperDetailsDTO
    {
        public required string Name { get; set; }
        public required string Country { get; set; }
    }
}
