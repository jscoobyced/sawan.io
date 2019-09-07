namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
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
                new DbMainContentRepositoryBuilder()
                    .WithMainContent(new MainContentBuilder().Build())
                    .WithHistory(new HistoryBuilder().Build("test"))
                .WithLanguage(Language.English)
                .Build());
            var reason = "because it should return english data when language is unknown.";
            var result = await mainContentService.GetMainContentAsync((Language)20);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async Task GetMainContentWithLanguage()
        {
            var expected = "This is expected text";
            var mainContentService = new MainContentService(
                new DbMainContentRepositoryBuilder()
                    .WithMainContent(new MainContentBuilder().Build())
                    .WithHistory(new HistoryBuilder().Build(expected))
                .Build());
            var result = await mainContentService.GetMainContentAsync(Language.English);
            result.Should().NotBeNull();
            result.MenuContent.Links.Should().NotBeNullOrEmpty();
            result.MenuContent.Links.First().Should().NotBeNull();
        }
    }
}