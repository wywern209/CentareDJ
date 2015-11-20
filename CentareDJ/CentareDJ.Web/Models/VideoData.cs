using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CentareDJ.Web.Models
{
    public class VideoData
    {
        public string VideoId { get; set; }

        public int? Duration { get; set; }

        public string ThumbnailUrl { get; set; }

    }
}