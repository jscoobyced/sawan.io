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

    public class MongoMainContentDatabaseBuilder
    {
        private MainContent mainContent;

        private bool nullMainContent = true;

        public MongoMainContentDatabaseBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            this.nullMainContent = false;
            return this;
        }

        public IMDatabase Build()
        {
            var mDatabase = new Mock<IMDatabase>();
            var mongoDatabase = new Mock<IMongoDatabase>();
            var mainContentCollection = this.nullMainContent
                ? null
                : this.CreateCollection<MainContent>(new List<MainContent>() { this.mainContent });
            mongoDatabase
                .Setup(x => x.GetCollection<MainContent>("MainContent", It.IsAny<MongoCollectionSettings>()))
                .Returns(mainContentCollection);
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