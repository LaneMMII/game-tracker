using System.Collections.Generic;

namespace GameTracker.Api.Models
{
    public class Platform
    {
        public int PlatformId { get; set; }
        public string Name { get; set; }
        public ICollection<Game>? Game { get; set; }  //Define relationship with game and platform because platform ID is foreign key in game table
    }
}