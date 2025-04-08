using GameTracker.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register controllers so that MVC controllers (like your GamesController) are discovered.
builder.Services.AddControllers();

// OpenAPI configuration (optional, for Swagger UI)
builder.Services.AddOpenApi();

// Register your DbContext (make sure your connection string "DefaultConnection" is set in appsettings.json)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    // Map the OpenAPI/Swagger endpoint
    app.MapOpenApi();
}

// This middleware ensures that HTTP requests are redirected to HTTPS.
app.UseHttpsRedirection();

// Map controller endpoints so that attribute-based routing in your controllers is active.
app.MapControllers();

// Seed the database with initial data if it is empty.
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    // Optionally, ensure migrations are applied:
    // dbContext.Database.Migrate();
    DbInit.Seed(dbContext);
}

// The weather forecast minimal API below is just an example and can be kept or removed.
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
