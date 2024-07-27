using System.ComponentModel.DataAnnotations;

namespace AngularApp1.Server.Models.DTOs
{
     public record GameDetailsDTO
     {
         [StringLength(75)]
         public required string Name { get; set; }
         [Range(0,1000)]
         public required decimal Price { get; set; }
         public required int GenreId { get; set; }
         public required DateOnly ReleaseDate { get; set; }
         public int[] DeveloperIDs { get; set;  } = [];

         public string Description { get; set; }
         public string ImagePath { get;set; }
         public string BannerPath { get; set; }
     }
   
}
