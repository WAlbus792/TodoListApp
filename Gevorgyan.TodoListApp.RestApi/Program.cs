using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Gevorgyan.TodoListApp.RestApi
{
    public class Program
    {
        public static void Main(string[] args) => CreateWebHostBuilder(args).Build().Run();

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(e => e.AddJsonFile("settings.json", false, true)
                                                 .AddJsonFile("settings.Development.json", false, true))
                .UseStartup<Startup>();
    }
}
