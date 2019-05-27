namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class DbMainContentRepositoryBuilder
    {

        private MainContent mainContent;
        private Language language = Language.English;

        public DbMainContentRepositoryBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            return this;
        }

        public DbMainContentRepositoryBuilder WithLanguage(Language language)
        {
            this.language = language;
            return this;
        }

        public IDbMainContentRepository Build()
        {
            var repository = new Mock<IDbMainContentRepository>();
            repository.Setup(x => x.GetMainContentAsync(this.language)).ReturnsAsync(this.mainContent);
            return repository.Object;
        }
    }
}