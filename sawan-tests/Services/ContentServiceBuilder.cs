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

        private bool saveStatus;

        public ContentServiceBuilder WithLanguageMainContent(MainContent mainContent, Language language)
        {
            this.mainContent = mainContent;
            this.language = language;
            return this;
        }

        public ContentServiceBuilder WithBlogElements(IEnumerable<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            return this;
        }

        public ContentServiceBuilder WithBlogElement(BlogElement blogElement)
        {
            this.blogElement = blogElement;
            return this;
        }

        public ContentServiceBuilder WithSaveStatus(bool saveStatus)
        {
            this.saveStatus = saveStatus;
            return this;
        }

        public IContentService Build()
        {
            var mockMainContentService = new Mock<IContentService>();
            mockMainContentService.Setup(x => x.GetMainContentAsync(this.language)).ReturnsAsync(this.mainContent);
            mockMainContentService.Setup(x => x.GetBlogPageAsync(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            mockMainContentService.Setup(x => x.GetBlogElementAsync(It.IsAny<string>())).ReturnsAsync(this.blogElement);
            mockMainContentService.Setup(x => x.SaveBlogElementAsync(It.IsAny<BlogElement>())).ReturnsAsync(this.saveStatus);
            return mockMainContentService.Object;
        }
    }
}