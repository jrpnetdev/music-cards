using System;
using System.Collections.Generic;

namespace ArtistsWebAPI.Models;

public partial class Artist
{
    public int ArtistId { get; set; }

    public string? Name { get; set; }

    public string? Mbid { get; set; }
    public string? SpecialEntityData { get; set; }

    public virtual ICollection<Album> Albums { get; set; } = new List<Album>();
}
