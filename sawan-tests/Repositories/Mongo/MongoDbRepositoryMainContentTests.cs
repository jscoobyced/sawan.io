namespace sawan.tests
{
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Repositories;
    using Xunit;

    public class MongoDbRepositoryMainContentTests
    {
        [Fact]
        public async Task GetMainContentNullTest()
        {
            var mDatabase = new MongoDatabaseBuilder().Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetMainContentAsync(Language.English);

            result.Should().BeNull();
        }

        [Fact]
        public async Task GetMainContentNullContentTest()
        {
            var mDatabase = new MongoDatabaseBuilder()
                .WithMainContent(null)
                .Build();
            var mongoDbRepository = new MongoDbRepository(mDatabase);
            var result = await mongoDbRepository.GetMainContentAsync(Language.English);

            result.Should().BeNull();
        }
    }
}