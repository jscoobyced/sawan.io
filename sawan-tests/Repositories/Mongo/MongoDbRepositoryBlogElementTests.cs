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
            var mDatabase = new MongoDatabaseBuilder().Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogElementAsync(string.Empty);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementNullBlogElementTest()
        {
            var mDatabase = new MongoDatabaseBuilder()
                .WithBlogElements(null)
                .Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogElementAsync(string.Empty);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementsNullTest()
        {
            var mDatabase = new MongoDatabaseBuilder().Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogPageAsync(3);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementsNullBlogElementTest()
        {
            var mDatabase = new MongoDatabaseBuilder()
                .WithBlogElements(null)
                .Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetBlogPageAsync(3);

            result.Should().BeEmpty();
        }
    }
}