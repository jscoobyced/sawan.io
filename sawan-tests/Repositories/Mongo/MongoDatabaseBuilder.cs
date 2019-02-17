namespace sawan.tests
{
    using System.Collections.Generic;
    using System.Linq;
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

    public class MongoDatabaseBuilder
    {
        private MainContent mainContent;

        private bool nullMainContent = true;

        private List<BlogElement> blogElements;

        private bool nullBlogCollection = true;

        public MongoDatabaseBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            this.nullMainContent = false;
            return this;
        }

        public MongoDatabaseBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            this.nullBlogCollection = false;
            return this;
        }

        public IMDatabase Build()
        {
            var mDatabase = new Mock<IMDatabase>();
            var mongoDatabase = new Mock<IMongoDatabase>();
            var mainContentCollection = this.nullMainContent
                ? null
                : this.CreateCollection<MainContent>(new List<MainContent>() { this.mainContent });
            var blogCollection = this.nullBlogCollection
                ? null
                : this.CreateCollection<BlogElement>(this.blogElements);
            mongoDatabase
                .Setup(x => x.GetCollection<MainContent>("MainContent", It.IsAny<MongoCollectionSettings>()))
                .Returns(mainContentCollection);
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
            return mongoCollection.Object;
        }
    }
}