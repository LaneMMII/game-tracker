using GameTracker.Api.Data;
using GameTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PlatformsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PlatformsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Platforms.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Platform platform)
    {
        // Check for null model before ModelState validation
        if (platform == null)
        {
            return BadRequest(new { message = "Platform data cannot be null." });
        }

        // Explicitly initialize the Game collection before ModelState validation
        platform.Game = new List<Game>();

        if (!ModelState.IsValid)
        {
            // Log the model state errors
            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    Console.WriteLine($"Property: {state.Key}, Error: {error.ErrorMessage}");
                }
            }
            return BadRequest(new { message = "Invalid platform data." });
        }

        // Check if a platform with the same name already exists
        if (await _context.Platforms.AnyAsync(p => p.Name == platform.Name))
        {
            return Conflict(new { message = "Platform already exists." });
        }
        
        await _context.Platforms.AddAsync(platform);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = platform.PlatformId }, platform);
    }
}