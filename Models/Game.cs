namespace GameTracker.Api.Models
{
    public enum GameStatus
    {
        Planned,
        Playing,
        Completed,
        Dropped
    }

    public class Game
    {
        public int GameId { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public GameStatus Status { get; set; }
        public int? Rating { get; set; } // Nullable int to allow for no rating
        public int PlatformId { get; set; }
        public Platform? Platform { get; set; } // <-- Make nullable
    }
}