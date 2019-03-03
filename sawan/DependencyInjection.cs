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
            services.AddTransient<IMainContentService, MainContentService>();
            services.AddTransient<IBlogContentService, BlogContentService>();
            services.AddTransient<IPairingService, PairingService>();
            services.AddTransient<IGitHubService, GitHubService>();
            services.AddTransient<IMigrationService, MigrationService>();
            services.AddTransient<IAuthentication, GoogleAuthentication>();

            // Repositories
            services.AddTransient<IRestConnector, RestConnector>();
            services.AddTransient<IDbMainContentRepository, MongoDbMainContentRepository>();
            services.AddTransient<IDbBlogRepository, MongoDbBlogRepository>();
            services.AddTransient<IMDatabase, MDatabase>();
        }
    }
}