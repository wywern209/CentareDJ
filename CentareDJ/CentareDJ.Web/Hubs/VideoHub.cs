using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace CentareDJ.Web.Hubs
{
    public class VideoHub : Hub
    {

        public void GetVideoInfo(string ids)
        {
            if (ids != String.Empty)
            {

            }
        }

        public void AddVideo(string videoId)
        {
            Clients.All.AddVideo(videoId);
        }
    }
}