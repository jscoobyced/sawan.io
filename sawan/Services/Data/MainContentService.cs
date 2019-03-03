namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class MainContentService : IMainContentService
    {
        private readonly IDbMainContentRepository mongoDbMainContentRepository;

        public MainContentService(IDbMainContentRepository mongoDbMainContentRepository, IDbBlogRepository dbBlogRepository)
        {
            this.mongoDbMainContentRepository = mongoDbMainContentRepository;
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            if (!Enum.IsDefined(typeof(Language), language))
            {
                language = Language.English;
            }

            return await this.mongoDbMainContentRepository.GetMainContentAsync(language);
        }
    }
}