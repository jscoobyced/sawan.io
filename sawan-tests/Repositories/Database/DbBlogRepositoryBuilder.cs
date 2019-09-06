namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class DbBlogRepositoryBuilder
    {
        private List<BlogElement> blogElements;

        private BlogElement blogElement;

        private bool isSavedStatus;

        public DbBlogRepositoryBuilder WithBlogElements(List<BlogElement> blogElements)
        {
            this.blogElements = blogElements;
            return this;
        }

        public DbBlogRepositoryBuilder WithBlogElement(BlogElement blogElement)
        {
            this.blogElement = blogElement;
            return this;
        }

        public DbBlogRepositoryBuilder WithSaveStatus(bool isSavedStatus)
        {
            this.isSavedStatus = isSavedStatus;
            return this;
        }

        public IDbBlogRepository Build()
        {
            var repository = new Mock<IDbBlogRepository>();
            repository.Setup(x => x.GetLastBlogDate()).ReturnsAsync(DateTime.Now);
            repository.Setup(x => x.GetBlogElementAsync(It.IsAny<int>())).ReturnsAsync(this.blogElement);
            repository.Setup(x => x.GetBlogPageAsync(It.IsAny<string>(), It.IsAny<int>())).ReturnsAsync(this.blogElements);
            repository.Setup(x => x.InsertBlogElementAsync(It.IsAny<BlogElement>())).ReturnsAsync(this.isSavedStatus);
            repository.Setup(x => x.UpdateBlogElementAsync(It.IsAny<BlogElement>())).ReturnsAsync(this.isSavedStatus);
            return repository.Object;
        }
    }
}