using AngularApp1.Server.Data;
using AngularApp1.Server.Models;
using AngularApp1.Server.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly GamestoreDbContext _dbContext;
        public GenresController(GamestoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _dbContext.Genres
                .Select(genre => new GenreSummaryDTO()
                {
                    Id = genre.Id,
                    Name = genre.Name,
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(genres);
        }

        [Route("/Genres/{Id}")]
        [HttpGet]
        public async Task<IActionResult> GetGenreById(int Id)
        {
            var genre = await _dbContext.Genres.FindAsync(Id);

            if (genre == null)
                return NotFound("Genre with the given id could not be found!");

            GenreSummaryDTO genreDTO = new GenreSummaryDTO()
            {
                Name = genre.Name,
                Id = Id
            };

            return Ok(genreDTO);
        }

        [Route("/AddGenre")]
        [HttpPost]
        public async Task<IActionResult> AddGenre([FromBody] GenreDetailsDTO genreDTO)
        {
            Genre genre;
            _dbContext.Add(genre = new Genre()
            {
               Name=genreDTO.Name,
            });

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/UpdateGenre/{Id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateGenre(int Id, [FromBody] GenreDetailsDTO genreDTO)
        {
            var existingGenre = await _dbContext.Genres.FindAsync(Id);

            if (existingGenre == null)
                return NotFound();

            _dbContext.Entry(existingGenre).CurrentValues.SetValues(
             new Genre()
             {
                Id=Id,
                Name = genreDTO.Name,
             }
             );

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/DeleteGenre/{Id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteGenre(int Id)
        {
            await _dbContext.Genres.Where(genre => genre.Id == Id).ExecuteDeleteAsync();

            return NoContent();
        }

    }
}
