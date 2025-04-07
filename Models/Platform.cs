using System.Collections.Generic;

namespace GameTracker.Api.Models
{
    public class Platform
    {
        public int PlatformId { get; set; } // Unique identifier for the platform
        public string Name { get; set; } // Name of the platform (e.g., PC, Xbox, PlayStation)
        public ICollection<Game> Game { get; set; } // Navigation property for related games
    }
}