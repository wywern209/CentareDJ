using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using CentareDJ.Web.Models;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;


namespace CentareDJ.Web.Hubs
{
    public class VideoHub : Hub
    {
        static Queue<string> VideoIds = new Queue<string>();
        static Dictionary<string, VideoData> Videos = new Dictionary<string, VideoData>();
        static string currentlyPlaying = null;
        static DateTime startTime = DateTime.UtcNow;
        public void GetVideoInfo(string ids)
        {
            if (ids != String.Empty)
            {
                //TODO
            }
        }

        public void AddVideo(string videoId)
        {

            VideoIds.Enqueue(videoId);
            Clients.All.AddVideo(videoId);
        }

        public void GetCurrentQueue()
        {
            int secondsElapsed = 0;
            Clients.Caller.populateQueue(Videos.ToArray(), secondsElapsed);
        }

        public void PlayNextVideo()
        {
        }

        private List<VideoData> GetInfoFromAPI(string ids)
        {
            return "";
        }
    }
}