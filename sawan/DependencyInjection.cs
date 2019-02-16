namespace sawan
{
    using sawan.Services;
    using Microsoft.Extensions.DependencyInjection;
    using sawan.Repositories;

    public static class DependencyInjection
    {
        public static void Inject(IServiceCollection services)
        {
            // Services
            services.AddTransient<IContentService, ContentService>();
            services.AddTransient<IPairingService, PairingService>();
            services.AddTransient<IGitHubService, GitHubService>();
            services.AddTransient<IMigrationService, MigrationService>();

            // Repositories
            services.AddTransient<IRestConnector, RestConnector>();
            services.AddTransient<IDbRepository, MongoDbRepository>();
        }
    }
}