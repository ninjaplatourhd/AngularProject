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
    public class GamesController : ControllerBase
    {
        private readonly GamestoreDbContext _dbContext;
        public GamesController(GamestoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            var games = await _dbContext.Games
                .Include(game => game.Genre)
                .Select(game => new GameSummaryDto() 
                { 
                    Id=game.GameID,
                    Name = game.Name,
                    Price = game.Price,
                    Genre = game.Genre.Name,
                    ReleaseDate = game.ReleaseDate,
                    Developers = game.Developers.Select(dev => dev.Name).ToList(),
                    Description = game.Description,
                    ImagePath=game.ImagePath,
                    BannerPath=game.BannerPath,
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(games);
        }

        [Route("/Games/{Id}")]
        [HttpGet]
        public async Task<IActionResult> GetGameById(int Id)
        {
            var game = await _dbContext.Games.Include(g => g.Genre)
                                   .Include(g => g.Developers)
                                   .FirstOrDefaultAsync(g => g.GameID == Id);
            if (game == null)
                return NotFound("The game with the following Id could not be found");

            GameSummaryDto gameDTO=new GameSummaryDto()
            {
                Id = game.GameID,
                Name = game.Name,
                Price = game.Price,
                Genre = game.Genre.Name,
                ReleaseDate = game.ReleaseDate,
                Developers = game.Developers.Select(dev => dev.Name).ToList(),
                Description = game.Description,
                ImagePath = game.ImagePath,
                BannerPath = game.BannerPath,
            };
            return Ok(gameDTO);
        }

        [Route("/AddGame")]
        [HttpPost]
        public async Task<IActionResult> AddGame([FromBody] GameDetailsDTO gameDTO)
        {
            var genre = await _dbContext.Genres.FindAsync(gameDTO.GenreId);
            if (genre == null)
                return BadRequest("Genre could not be found!");

            Game game;
            _dbContext.Add(game = new Game()
            {
                Name = gameDTO.Name,
                Genre = genre,
                Price = gameDTO.Price,
                ReleaseDate = gameDTO.ReleaseDate,
                Description = gameDTO.Description,
                ImagePath = gameDTO.ImagePath,
                BannerPath = gameDTO.BannerPath,
            });

            game.Developers.Clear();
            foreach (int developerId in gameDTO.DeveloperIDs)
            {
                Developer dev = await _dbContext.Developers.FindAsync(developerId);
                if (dev == null)
                    return BadRequest($"The developer with the id of {developerId} doesn't exist!");
                game.Developers.Add(dev);
            }


            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/UpdateGame/{Id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateGame(int Id, [FromBody] GameDetailsDTO gameDTO)
        {
            var existingGame = await _dbContext.Games
                                          .Include(g => g.Developers) 
                                          .FirstOrDefaultAsync(g => g.GameID == Id);

            if (existingGame == null)
                return NotFound();

            var genre = await _dbContext.Genres.FindAsync(gameDTO.GenreId);
            if (genre == null)
                return BadRequest("Genre could not be found!");


            Game updatedGame = new Game()
            {
                GameID = Id,
                Name = gameDTO.Name,
                GenreId = gameDTO.GenreId,
                Price = gameDTO.Price,
                ReleaseDate = gameDTO.ReleaseDate,
                Description = gameDTO.Description,
                ImagePath = gameDTO.ImagePath,
                BannerPath = gameDTO.BannerPath,
               
            };

            updatedGame.Developers.Clear();

   
            foreach (int developerId in gameDTO.DeveloperIDs)
            {
                Developer dev = await _dbContext.Developers.FindAsync(developerId);
                if (dev == null)
                    return BadRequest($"The developer with the id of {developerId} doesn't exist!");
                updatedGame.Developers.Add(dev);
            }

            _dbContext.Entry(existingGame).CurrentValues.SetValues(updatedGame);

            existingGame.Developers.Clear();
            foreach (var developer in updatedGame.Developers)
            {
                existingGame.Developers.Add(developer);
            }

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/DeleteGame/{Id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteGame(int Id)
        {
             await _dbContext.Games.Where(game => game.GameID == Id).ExecuteDeleteAsync();

            return NoContent();
        }
    }
}
