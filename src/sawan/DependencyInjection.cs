namespace sawan
{
    using sawan.Services;
    using Microsoft.Extensions.DependencyInjection;
    using sawan.Repositories;

    public static class DependencyInjection
    {
        public static void Inject(IServiceCollection services)
        {
            services.AddTransient<IMainContentService, MainContentService>();
            services.AddTransient<IPairingService, PairingService>();
            services.AddTransient<IGitHubService, GitHubService>();
            services.AddTransient<IRestConnector, RestConnector>();
            services.AddTransient<IMongoDbRepository, MongoDbRepository>();
        }
    }
}