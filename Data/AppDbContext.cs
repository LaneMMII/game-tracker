// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using GameTracker.Api.Models;

namespace GameTracker.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Platform> Platforms { get; set; }
    }
}
