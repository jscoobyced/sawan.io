namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class MainContentService : IMainContentService
    {
        private IMongoDbRepository mongoDbRepository;

        public MainContentService(IMongoDbRepository mongoDbRepository)
        {
            this.mongoDbRepository = mongoDbRepository;
        }

        public async Task<MainContent> GetMainContent(Language language)
        {
            if (!Enum.IsDefined(typeof(Language), language))
            {
                language = Language.English;
            }

            return await this.mongoDbRepository.GetMainContent(language);
        }
    }
}