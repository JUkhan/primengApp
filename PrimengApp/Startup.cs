using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PrimengApp.Startup))]
namespace PrimengApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
