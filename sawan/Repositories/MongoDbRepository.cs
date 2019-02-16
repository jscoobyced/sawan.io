namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MongoDB.Bson.Serialization;
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

        public async Task<bool> InsertMainContent(string mainContent)
        {
            string mainContentText = null;
            try
            {
                mainContentText = File.ReadAllText($"{this.DataFolder}/{mainContent}");
            }
            catch
            {
                return false;
            }

            var mainContentObject = BsonSerializer.Deserialize<MainContent>(mainContentText);
            return await this.InsertMainContent(mainContentObject);
        }

        public async Task<bool> InsertMainContent(MainContent mainContent)
        {
            try
            {
                await this.MainContentCollection.InsertOneAsync(mainContent);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPage(int maxResult)
        {
            var result = this.BlogCollection.Find(x => true).SortByDescending(x => x.BlogDate).Limit(maxResult);
            var list = await result.ToListAsync();
            return list.Take(maxResult);
        }

        public async Task<bool> InsertBlogElement(string blogElement)
        {
            string blogElementText = null;
            try
            {
                blogElementText = File.ReadAllText($"{this.DataFolder}/{blogElement}");
            }
            catch
            {
                return false;
            }

            var blogElementObject = BsonSerializer.Deserialize<IEnumerable<BlogElement>>(blogElementText);
            return await this.InsertBlogElement(blogElementObject);
        }

        public async Task<bool> InsertBlogElement(IEnumerable<BlogElement> blogElements)
        {
            try
            {
                await this.BlogCollection.InsertManyAsync(blogElements);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<BlogElement> GetBlogElement(string blogId)
        {
            var result = await this.BlogCollection.FindAsync(x => x.Id == blogId);
            return await result.FirstOrDefaultAsync();
        }

        private string DataFolder => "Data/mongo/";

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