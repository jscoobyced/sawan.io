namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Services;

    public class BlogContentServiceBuilder
    {
        private IEnumerable<BlogElement> blogElements;

        private BlogElement blogElement;

        private bool saveStatus;

        public BlogContentServiceBuilder WithBlogElement(BlogElement blogElement)
        {
            this.blogElement = blogElement;
            return this;
        }

        public BlogContentServiceBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            return this;
        }

        public BlogContentServiceBuilder WithSaveStatus(bool saveStatus)
        {
            this.saveStatus = saveStatus;
            return this;
        }

        public IBlogContentService Build()
        {
            var mockBlogContentService = new Mock<IBlogContentService>();
            mockBlogContentService.Setup(x => x.GetBlogPageAsync(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            mockBlogContentService.Setup(x => x.GetBlogElementAsync(It.IsAny<int>())).ReturnsAsync(this.blogElement);
            mockBlogContentService.Setup(x => x.SaveBlogElementAsync(It.IsAny<BlogElement>())).ReturnsAsync(this.saveStatus);
            return mockBlogContentService.Object;
        }
    }
}