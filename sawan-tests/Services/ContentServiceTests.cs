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
        public void WithUnknownLanguageMainContentService()
        {

            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .WithLanguage(Language.English)
                .Build());
            var reason = "because it should return english data when language is unknown.";
            MainContent result = null;
            Func<Task> blogPage = async () => result = await mainContentService.GetMainContent((Language)20);
            blogPage.Should().NotThrow<NullReferenceException>(reason);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async void GetMainContentWithLanguage()
        {
            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .Build());
            var result = await mainContentService.GetMainContent(Language.English);
            result.Should().NotBeNull();
        }
    }
}