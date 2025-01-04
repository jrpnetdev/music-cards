using ArtistsWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtistsWebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ArtistController : ControllerBase
{
    private readonly ILogger<ArtistController> _logger;
    private readonly ChinookContext _context;

    public ArtistController(ILogger<ArtistController> logger, ChinookContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Artist> Get()
    {
        var artists = _context.Artists.ToList();

        return artists;
    }

    [HttpGet]
    [Route("{id}")]
    public Artist? Get(int id)
    {
        if (id <= 0)
        {
            return null;
        }
        var artist = _context.Artists.AsQueryable().Where(a => a.ArtistId == id).Include(a => a.Albums).FirstOrDefault();

        return artist;
    }

    [HttpGet]
    [Route("pagination")]
    public List<Artist>? Get(int startIndex, int limit)
    {
        if (startIndex < 0 || limit <= 0)
        {
            return null;
        }
        if(startIndex > _context.Artists.Count())
        {
            return null;
        }
        var artists = _context.Artists.AsQueryable().Skip(startIndex).Take(limit).ToList();

        return artists;
    }

}
