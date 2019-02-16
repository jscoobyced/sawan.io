namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class ContentService : IContentService
    {
        private IDbRepository mongoDbRepository;

        public ContentService(IDbRepository mongoDbRepository)
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

        public async Task<IEnumerable<BlogElement>> GetBlogPage(int maxResult)
        {
            return await this.mongoDbRepository.GetBlogPage(maxResult);
        }

        public async Task<BlogElement> GetBlogElement(string blogId)
        {
            return await this.mongoDbRepository.GetBlogElement(blogId);
        }
    }
}