namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MongoDB.Driver;

    public class MongoDbRepository : IDbRepository
    {
        private IMongoCollection<MainContent> mainContentCollection;
        private IMongoCollection<BlogElement> blogCollection;
        private IMongoDatabase database;
        private IOptions<AppSettings> appSettings;

        public MongoDbRepository(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings;
        }

        public async Task<MainContent> GetMainContent(Language language)
        {
            var result = await this.MainContentCollection.FindAsync(x => x.Language == language);
            var list = await result.ToListAsync();
            return list.FirstOrDefault();
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPage(DateTime from, int maxResult)
        {
            var result = this.BlogCollection.Find(x => true).SortByDescending(x => x.BlogDate).Limit(maxResult);
            var list = await result.ToListAsync();
            return list.Take(maxResult);
        }

        private IMongoDatabase Database
        {
            get
            {
                if (this.database == null)
                {
                    var client = new MongoClient(this.appSettings.Value.Mongo.ConnectionString);
                    this.database = client.GetDatabase(this.appSettings.Value.Mongo.Database);
                }

                return this.database;
            }
        }

        private IMongoCollection<MainContent> MainContentCollection
        {
            get
            {
                if (this.mainContentCollection == null)
                {
                    this.mainContentCollection = this.Database.GetCollection<MainContent>("MainContent");
                }

                return this.mainContentCollection;
            }
        }

        private IMongoCollection<BlogElement> BlogCollection
        {
            get
            {
                if (this.blogCollection == null)
                {
                    this.blogCollection = this.Database.GetCollection<BlogElement>("Blog");
                }

                return this.blogCollection;
            }
        }
    }
}