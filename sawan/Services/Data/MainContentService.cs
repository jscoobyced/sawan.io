namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class MainContentService : IMainContentService
    {
        private readonly IDbMainContentRepository dbMainContentRepository;

        public MainContentService(IDbMainContentRepository dbMainContentRepository)
        {
            this.dbMainContentRepository = dbMainContentRepository;
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            if (!Enum.IsDefined(typeof(Language), language))
            {
                language = Language.English;
            }

            var mainContent = await this.dbMainContentRepository.GetMainContentAsync(language);
            mainContent.MenuContent.Links = new List<Link>();

            return mainContent;
        }
    }
}