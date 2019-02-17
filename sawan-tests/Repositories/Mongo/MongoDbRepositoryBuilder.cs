namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class MongoDbRepositoryBuilder
    {

        private MainContent mainContent;
        private Language language = Language.English;

        private List<BlogElement> blogElements;

        private BlogElement blogElement;

        public MongoDbRepositoryBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            return this;
        }

        public MongoDbRepositoryBuilder WithLanguage(Language language)
        {
            this.language = language;
            return this;
        }

        public MongoDbRepositoryBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            return this;
        }

        public MongoDbRepositoryBuilder WithBlogElement(BlogElement blogElement)
        {
            this.blogElement = blogElement;
            return this;
        }

        public IDbRepository Build()
        {
            var repository = new Mock<IDbRepository>();
            repository.Setup(x => x.GetMainContentAsync(this.language)).ReturnsAsync(this.mainContent);
            repository.Setup(x => x.GetBlogElementAsync(It.IsAny<string>())).ReturnsAsync(this.blogElement);
            repository.Setup(x => x.GetBlogPageAsync(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            return repository.Object;
        }
    }
}