namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;
    using MongoDB.Bson.Serialization.Serializers;
    using MongoDB.Driver;
    using MongoDB.Driver.Core.Bindings;
    using MongoDB.Driver.Core.Operations;
    using MongoDB.Driver.Core.WireProtocol.Messages.Encoders;
    using Moq;
    using sawan.Repositories;

    public class MongoBlogDatabaseBuilder
    {
        private List<BlogElement> blogElements;

        private bool nullBlogCollection = true;

        private int matchedCount = 0;

        private int modifiedCount = 0;

        public MongoBlogDatabaseBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            this.nullBlogCollection = false;
            return this;
        }

        public MongoBlogDatabaseBuilder WithMatchedCount(int matchedCount)
        {
            this.matchedCount = matchedCount;
            this.nullBlogCollection = false;
            return this;
        }

        public MongoBlogDatabaseBuilder WithModifiedCount(int modifiedCount)
        {
            this.modifiedCount = modifiedCount;
            this.nullBlogCollection = false;
            return this;
        }

        public IMDatabase Build()
        {
            var mDatabase = new Mock<IMDatabase>();
            var mongoDatabase = new Mock<IMongoDatabase>();
            var blogCollection = this.nullBlogCollection
                ? null
                : this.CreateCollection<BlogElement>(this.blogElements);
            mongoDatabase
                .Setup(x => x.GetCollection<BlogElement>("Blog", It.IsAny<MongoCollectionSettings>()))
                .Returns(blogCollection);
            mDatabase.Setup(x => x.GetDatabase()).Returns(mongoDatabase.Object);
            return mDatabase.Object;
        }

        private IMongoCollection<T> CreateCollection<T>(List<T> dataList)
        {
            var asyncCursor = new MockAsyncCursor<T>(new List<T>[] { dataList });
            var mongoCollection = new Mock<IMongoCollection<T>>();
            mongoCollection.Setup(
                x => x.FindAsync(
                    It.IsAny<FilterDefinition<T>>(),
                    It.IsAny<FindOptions<T, T>>(),
                    It.IsAny<CancellationToken>()))
                .ReturnsAsync(asyncCursor);
            mongoCollection.Setup(
                x => x.ReplaceOneAsync(
                    It.IsAny<FilterDefinition<T>>(),
                    It.IsAny<T>(),
                    It.IsAny<UpdateOptions>(),
                    It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ReplaceOneResult.Acknowledged(this.matchedCount, this.modifiedCount, "1"));
            return mongoCollection.Object;
        }
    }
}