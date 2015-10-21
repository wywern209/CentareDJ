using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CentareDJ.Web.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.youtubekey = ApiKeys.YoutubeDataApiKey;
            return View();
        }

        public JsonResult GetVideoInfo(string ids)
        {
            if(ids != String.Empty)
            {

            }
            return new JsonResult();
        }
    }
}