namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class DbMainContentRepositoryBuilder
    {

        private MainContent mainContent;
        private List<DateTime> history;
        private Language language = Language.English;

        public DbMainContentRepositoryBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            return this;
        }

        public DbMainContentRepositoryBuilder WithHistory(List<DateTime> history)
        {
            this.history = history;
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
            repository.Setup(x => x.GetBaseMainContent(this.language)).ReturnsAsync(this.mainContent);
            repository.Setup(x => x.GetHistory()).ReturnsAsync(this.history);
            return repository.Object;
        }
    }
}