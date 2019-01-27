namespace sawan.tests
{
    using Moq;
    using sawan.Repositories;

    public class MongoDbRepositoryBuilder
    {

        private MainContent mainContent;
        private Language language = Language.English;

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

        public IMongoDbRepository Build()
        {
            var repository = new Mock<IMongoDbRepository>();
            repository.Setup(x => x.GetMainContent(this.language)).ReturnsAsync(this.mainContent);
            return repository.Object;
        }
    }
}