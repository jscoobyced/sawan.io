namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;
    using MongoDB.Driver;

    public class MongoDbBlogRepository : IDbBlogRepository
    {
        private readonly IMongoDatabase mongoDatabase;
        private IMongoCollection<BlogElement> blogCollection;

        public MongoDbBlogRepository(IMDatabase database)
        {
            this.mongoDatabase = database.GetDatabase();
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult)
        {
            if (this.BlogCollection == null)
            {
                return null;
            }
            var filter = new BsonDocument();
            var sort = Builders<BlogElement>.Sort.Descending("BlogDate");
            var options = new FindOptions<BlogElement>
            {
                Sort = sort
            };

            var result = await this.BlogCollection.FindAsync(filter, options);

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

        public async Task<bool> UpdateBlogElementAsync(BlogElement blogElement)
        {
            if (blogElement == null)
            {
                return false;
            }

            try
            {
                var builder = Builders<BlogElement>.Filter;
                var filter = builder.Eq("Id", blogElement.Id);
                var result = await this.BlogCollection.ReplaceOneAsync(
                    filter,
                    blogElement);
                return result.ModifiedCount == 1;
            }
            catch
            {
                return false;
            }
        }

        private string DataFolder => "Data/mongo/";

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