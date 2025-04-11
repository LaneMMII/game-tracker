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
        if (!ModelState.IsValid) return BadRequest(ModelState);

        await _context.Platforms.AddAsync(platform);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = platform.PlatformId }, platform);
    }
}