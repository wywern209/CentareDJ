using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CentareDJ.Web.Startup))]
namespace CentareDJ.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
