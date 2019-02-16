namespace sawan.tests
{
    using System;
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Services;
    using Xunit;

    public class ContentServiceTests
    {

        [Fact]
        public async Task WithUnknownLanguageMainContentService()
        {

            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .WithLanguage(Language.English)
                .Build());
            var reason = "because it should return english data when language is unknown.";
            var result = await mainContentService.GetMainContentAsync((Language)20);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async Task GetMainContentWithLanguage()
        {
            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .Build());
            var result = await mainContentService.GetMainContentAsync(Language.English);
            result.Should().NotBeNull();
        }
    }
}