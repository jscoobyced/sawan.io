namespace sawan.tests
{
    using System.Collections.Generic;
    using Moq;
    using sawan.Repositories;

    public class MongoDbMainContentRepositoryBuilder
    {

        private MainContent mainContent;
        private Language language = Language.English;

        public MongoDbMainContentRepositoryBuilder WithMainContent(MainContent mainContent)
        {
            this.mainContent = mainContent;
            return this;
        }

        public MongoDbMainContentRepositoryBuilder WithLanguage(Language language)
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