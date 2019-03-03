namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Services;
    using Xunit;

    public class MainContentServiceTests
    {

        [Fact]
        public async Task WithUnknownLanguageMainContentService()
        {

            var mainContentService = new MainContentService(
                new MongoDbMainContentRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .WithLanguage(Language.English)
                .Build(),
                null);
            var reason = "because it should return english data when language is unknown.";
            var result = await mainContentService.GetMainContentAsync((Language)20);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async Task GetMainContentWithLanguage()
        {
            var mainContentService = new MainContentService(
                new MongoDbMainContentRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .Build(),
                null);
            var result = await mainContentService.GetMainContentAsync(Language.English);
            result.Should().NotBeNull();
        }
    }
}