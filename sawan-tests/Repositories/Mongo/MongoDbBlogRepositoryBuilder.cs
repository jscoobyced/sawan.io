namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class MongoDbBlogRepositoryBuilder
    {
        private List<BlogElement> blogElements;

        private BlogElement blogElement;

        public MongoDbBlogRepositoryBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            return this;
        }

        public MongoDbBlogRepositoryBuilder WithBlogElement(BlogElement blogElement)
        {
            this.blogElement = blogElement;
            return this;
        }

        public IDbBlogRepository Build()
        {
            var repository = new Mock<IDbBlogRepository>();
            repository.Setup(x => x.GetBlogElementAsync(It.IsAny<string>())).ReturnsAsync(this.blogElement);
            repository.Setup(x => x.GetBlogPageAsync(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            return repository.Object;
        }
    }
}