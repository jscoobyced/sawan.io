namespace sawan
{
    using System.Net;
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;

    public static class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel(s => s.AddServerHeader = false)
                .UseStartup<Startup>()
                .ConfigureKestrel((context, options) =>
                {
                    options.Listen(IPAddress.Any, 5000);
                })
                .Build();
    }
}
