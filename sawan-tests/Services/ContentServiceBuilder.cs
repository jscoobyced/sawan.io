namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Services;

    public class ContentServiceBuilder
    {
        private MainContent mainContent;

        private Language language;

        private IEnumerable<BlogElement> blogElements;

        private BlogElement blogElement;

        public ContentServiceBuilder WithLanguageMainContent(MainContent mainContent, Language language)
        {
            this.mainContent = mainContent;
            this.language = language;
            return this;
        }

        public ContentServiceBuilder WithBlogElements(IEnumerable<BlogElement> blogELements)
        {
            this.blogElements = blogELements;
            return this;
        }
        public ContentServiceBuilder WithBlogElement(BlogElement blogELement)
        {
            this.blogElement = blogELement;
            return this;
        }

        public IContentService Build()
        {
            var mockMainContentService = new Mock<IContentService>();
            mockMainContentService.Setup(x => x.GetMainContent(this.language)).ReturnsAsync(this.mainContent);
            mockMainContentService.Setup(x => x.GetBlogPage(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            mockMainContentService.Setup(x => x.GetBlogElement(It.IsAny<string>())).ReturnsAsync(this.blogElement);
            return mockMainContentService.Object;
        }
    }
}