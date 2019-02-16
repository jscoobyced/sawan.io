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
        private readonly IMongoDatabase mongoDatabase;
        private IMongoCollection<MainContent> mainContentCollection;
        private IMongoCollection<BlogElement> blogCollection;

        public MongoDbRepository(IMDatabase database)
        {
            this.mongoDatabase = database.GetDatabase();
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            if (this.MainContentCollection == null)
            {
                return null;
            }

            var result = await this.MainContentCollection.FindAsync(x => x.Language == language);

            if (result == null)
            {
                return null;
            }

            var list = await result.ToListAsync();

            if (!list.Any())
            {
                return null;
            }

            return list.FirstOrDefault();
        }

        public async Task<bool> InsertMainContentAsync(string mainContent)
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
            return await this.InsertMainContentAsync(mainContentObject);
        }

        public async Task<bool> InsertMainContentAsync(MainContent mainContent)
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

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult)
        {
            if (this.BlogCollection == null)
            {
                return null;
            }
            // Need to SortByDescending(x => x.BlogDate).Limit(maxResult);
            var result = await this.BlogCollection.FindAsync(x => true);

            if (result == null)
            {
                return null;
            }

            var list = await result.ToListAsync();
            return list.Take(maxResult);
        }

        public async Task<bool> InsertBlogElementAsync(string blogElement)
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
            return await this.InsertBlogElementAsync(blogElementObject);
        }

        public async Task<bool> InsertBlogElementAsync(IEnumerable<BlogElement> blogElements)
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

        public async Task<BlogElement> GetBlogElementAsync(string blogId)
        {
            if (this.BlogCollection == null)
            {
                return null;
            }

            var result = await this.BlogCollection.FindAsync(x => x.Id == blogId);

            if (result == null)
            {
                return null;
            }

            return await result.FirstOrDefaultAsync();
        }

        private string DataFolder => "Data/mongo/";

        private IMongoCollection<MainContent> MainContentCollection
        {
            get
            {
                if (this.mainContentCollection == null)
                {
                    this.mainContentCollection = this.mongoDatabase.GetCollection<MainContent>("MainContent");
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
                    this.blogCollection = this.mongoDatabase.GetCollection<BlogElement>("Blog");
                }

                return this.blogCollection;
            }
        }
    }
}