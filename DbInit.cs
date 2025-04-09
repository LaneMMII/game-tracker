using System.Linq;
using GameTracker.Api.Models;

namespace GameTracker.Api.Data
{
    public static class DbInit
    {
        public static void Seed(AppDbContext context)
        {
            if (context.Games.Any())
            {
                // Data was already seeded.
                return;
            }

            // Create some sample platforms.
            var pcPlatform = new Platform { Name = "PC" };
            var xboxPlatform = new Platform { Name = "Xbox" };

            // Add the platforms to the context.
            context.Platforms.AddRange(pcPlatform, xboxPlatform);
            context.SaveChanges();

            // Create sample games.
            var sampleGames = new[]
            {
                new Game { Title = "Elden Ring", Genre = "Action RPG", Status = GameStatus.Planned, Rating = null, PlatformId = pcPlatform.PlatformId },
                new Game { Title = "Halo Infinite", Genre = "Shooter", Status = GameStatus.Playing, Rating = 8, PlatformId = xboxPlatform.PlatformId },
                new Game { Title = "The Witcher 3", Genre = "RPG", Status = GameStatus.Completed, Rating = 10, PlatformId = pcPlatform.PlatformId }
            };

            // Add sample games.
            context.Games.AddRange(sampleGames);
            context.SaveChanges();
        }
    }
}
