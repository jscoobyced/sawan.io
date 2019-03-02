namespace sawan.tests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Repositories;
    using Xunit;

    public class MongoDbRepositoryBlogElementTests
    {
        [Fact]
        public async Task GetBlogElementNullTest()
        {
            var mDatabase = new MongoBlogDatabaseBuilder().Build();
            var mongoDbRepository = new MongoDbMainContentRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogElementAsync(string.Empty);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementNullBlogElementTest()
        {
            var mDatabase = new MongoBlogDatabaseBuilder()
                .WithBlogElements(null)
                .Build();
            var mongoDbRepository = new MongoDbMainContentRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogElementAsync(string.Empty);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementsNullTest()
        {
            var mDatabase = new MongoBlogDatabaseBuilder().Build();
            var mongoDbRepository = new MongoDbMainContentRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogPageAsync(3);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementsNullBlogElementTest()
        {
            var mDatabase = new MongoBlogDatabaseBuilder()
                .WithBlogElements(null)
                .Build();
            var mongoDbRepository = new MongoDbMainContentRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogPageAsync(3);

            result.Should().BeEmpty();
        }

        [Fact]
        public async Task UpdateBlogElementAsyncTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var mDatabase = new MongoBlogDatabaseBuilder()
                .WithMatchedCount(1)
                .WithModifiedCount(1)
                .Build();
            var mongoDbRepository = new MongoDbMainContentRepository(mDatabase);
            var result = await mongoDbRepository.UpdateBlogElementAsync(blogElement);
            result.Should().BeTrue();
        }
    }
}