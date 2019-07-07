namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Services;

    public class MainContentServiceBuilder
    {
        private MainContent mainContent;

        private Language language;

        public MainContentServiceBuilder WithLanguageMainContent(MainContent mainContent, Language language)
        {
            this.mainContent = mainContent;
            this.language = language;
            return this;
        }
        
        public IMainContentService Build()
        {
            var mockMainContentService = new Mock<IMainContentService>();
            mockMainContentService.Setup(x => x.GetMainContentAsync(this.language)).ReturnsAsync(this.mainContent);
            return mockMainContentService.Object;
        }
    }
}