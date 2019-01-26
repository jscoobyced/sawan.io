namespace sawan.tests
{
    using FluentAssertions;
    using sawan.Services;
    using Xunit;

    public class MainContentServiceTests
    {
        [Fact]
        public async void GetMainContentWithLanguage()
        {
            var mainContentService = new MainContentService();
            var result = await mainContentService.GetMainContent(Language.English);
            result.Should().NotBeNull();
        }
    }
}