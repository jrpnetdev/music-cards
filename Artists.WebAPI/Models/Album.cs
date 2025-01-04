using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArtistsWebAPI.Models;

public partial class Album
{
    public int AlbumId { get; set; }

    public string Title { get; set; } = null!;
    
    [ForeignKey("ArtistId")] 
    public int ArtistId { get; set; }

    public virtual Artist Artist { get; set; } = null!;

    public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}
