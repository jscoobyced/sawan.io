namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class MongoDbBlogRepositoryBuilder
    {
        private List<BlogElement> blogElements;

        private BlogElement blogElement;

        private bool isSavedStatus;

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

        public MongoDbBlogRepositoryBuilder WithSaveStatus(bool isSavedStatus)
        {
            this.isSavedStatus = isSavedStatus;
            return this;
        }

        public IDbBlogRepository Build()
        {
            var repository = new Mock<IDbBlogRepository>();
            repository.Setup(x => x.GetBlogElementAsync(It.IsAny<string>())).ReturnsAsync(this.blogElement);
            repository.Setup(x => x.GetBlogPageAsync(It.IsAny<int>())).ReturnsAsync(this.blogElements);
            repository.Setup(x => x.InsertBlogElementAsync(It.IsAny<List<BlogElement>>())).ReturnsAsync(this.isSavedStatus);
            repository.Setup(x => x.UpdateBlogElementAsync(It.IsAny<BlogElement>())).ReturnsAsync(this.isSavedStatus);
            return repository.Object;
        }
    }
}