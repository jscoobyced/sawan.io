namespace sawan
{
    using sawan.Services;
    using Microsoft.Extensions.DependencyInjection;

    public static class DependencyInjection
    {
        public static void Inject(IServiceCollection services)
        {
            services.AddTransient<IPairingService, PairingService>();
            services.AddTransient<IGitHubService, GitHubService>();
            services.AddTransient<IRestConnector, RestConnector>();
        }
    }
}