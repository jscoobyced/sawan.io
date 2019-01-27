namespace sawan.Repositories
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MongoDB.Driver;

    public class MongoDbRepository : IMongoDbRepository
    {
        private IMongoCollection<MainContent> mainContent;
        private IOptions<AppSettings> appSettings;

        public MongoDbRepository(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings;
            var client = new MongoClient(appSettings.Value.Mongo.ConnectionString);
            var database = client.GetDatabase(appSettings.Value.Mongo.Database);
            this.mainContent = database.GetCollection<MainContent>("MainContent");
        }

        public async Task<MainContent> GetMainContent(Language language)
        {
            var result = await this.mainContent.FindAsync(x => x.Language == language);
            var list = await result.ToListAsync();
            return list.FirstOrDefault();
        }
    }
}