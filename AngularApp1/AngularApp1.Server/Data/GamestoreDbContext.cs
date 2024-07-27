using AngularApp1.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularApp1.Server.Data
{
    public class GamestoreDbContext : DbContext
    {
        public GamestoreDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Genre>().HasData(
                new Genre() { Id =1, Name="RPG"},
                new Genre() { Id = 2, Name = "TBS" },
                new Genre() { Id = 3, Name = "Roguelike" },
                new Genre() { Id = 4, Name = "FPS" },
                new Genre() { Id = 5, Name = "Sports" },
                new Genre() { Id = 6, Name = "MOBA" },
                new Genre() { Id = 7, Name = "Hack and Slash" },
                new Genre() { Id = 8, Name = "Third Person Shooter" },
                new Genre() { Id = 9, Name = "Soulslike" },
                new Genre() { Id = 10, Name = "Puzzle" },
                new Genre() { Id = 11, Name = "Grand Strategy"},
                new Genre() { Id = 12, Name = "RTS" },
                new Genre() { Id = 13, Name = "CRPG" },
                new Genre() { Id = 14, Name = "BattleRoyale" }
                );
        }
        public DbSet<Game> Games { get; set; }

        public DbSet<Developer> Developers { get; set; }

        public DbSet<Genre> Genres { get; set; }
    }
}
