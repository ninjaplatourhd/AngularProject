using AngularApp1.Server.Data;
using AngularApp1.Server.Models.DTOs;
using AngularApp1.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevelopersController : ControllerBase
    {
        private readonly GamestoreDbContext _dbContext;

        public DevelopersController(GamestoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetDevelopers()
        {
            var developers = await _dbContext.Developers
                .Select(developer => new DeveloperSummaryDTO()
                {
                    Id = developer.Id,
                    Name = developer.Name,
                    Country=developer.Country,
                })
                .AsNoTracking()
                .ToListAsync();

            return Ok(developers);
        }

        [Route("/Developers/{Id}")]
        [HttpGet]
        public async Task<IActionResult> GetDeveloperById(int Id)
        {
            var developer = await _dbContext.Developers.FindAsync(Id);

            if (developer == null)
                return NotFound("Developer with the given id could not be found!");

            DeveloperSummaryDTO developerDTO = new DeveloperSummaryDTO()
            {
                Id = Id,
                Name = developer.Name,
                Country=developer.Country,
            };

            return Ok(developerDTO);
        }
        
        [Route("/AddDeveloper")]
        [HttpPost]
        public async Task<IActionResult> AddDeveloper([FromBody] DeveloperDetailsDTO developerDTO)
        {
            Developer developer;
            _dbContext.Add(developer= new Developer()
            {
                Name = developerDTO.Name,
                Country = developerDTO.Country,
            });

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/UpdateDeveloper/{Id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateDeveloper(int Id, [FromBody] DeveloperDetailsDTO developerDTO)
        {
            var existingDeveloper = await _dbContext.Developers.FindAsync(Id);

            if (existingDeveloper == null)
                return NotFound();

            _dbContext.Entry(existingDeveloper).CurrentValues.SetValues(
             new Developer()
             {
                 Id = Id,
                 Name = developerDTO.Name,
                 Country = developerDTO.Country,
             }
             );

            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [Route("/DeleteDeveloper/{Id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDeveloper(int Id)
        {
            await _dbContext.Developers.Where(developer => developer.Id == Id).ExecuteDeleteAsync();

            return NoContent();
        }
    }
}
