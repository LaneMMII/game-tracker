using GameTracker.Api.Data;
using GameTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly AppDbContext _context;
    public GamesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Games.Include(g => g.Platform).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var game = await _context.Games.Include(g => g.Platform).FirstOrDefaultAsync(g => g.GameId == id);
        if (game == null) return NotFound();
        return Ok(game);
    }

[HttpPost]
public async Task<IActionResult> Create([FromBody] Game game)
{
    if (!ModelState.IsValid)
    {
        var errorList = ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .Select(e => new {
                Field = e.Key,
                Errors = e.Value.Errors.Select(x => x.ErrorMessage)
            });

        return BadRequest(new { message = "Model validation failed", errors = errorList });
    }

    await _context.Games.AddAsync(game);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = game.GameId }, game);
}


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Game updated)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null) return NotFound();

        game.Title = updated.Title;
        game.Genre = updated.Genre;
        game.Status = updated.Status;
        game.Rating = updated.Rating;
        game.PlatformId = updated.PlatformId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var game = await _context.Games.FindAsync(id);
        if (game == null) return NotFound();

        _context.Games.Remove(game);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}