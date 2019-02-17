namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class ContentService : IContentService
    {
        private readonly IDbRepository mongoDbRepository;

        public ContentService(IDbRepository mongoDbRepository)
        {
            this.mongoDbRepository = mongoDbRepository;
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            if (!Enum.IsDefined(typeof(Language), language))
            {
                language = Language.English;
            }

            return await this.mongoDbRepository.GetMainContentAsync(language);
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult)
        {
            return await this.mongoDbRepository.GetBlogPageAsync(maxResult);
        }

        public async Task<BlogElement> GetBlogElementAsync(string blogId)
        {
            if (string.IsNullOrWhiteSpace(blogId))
            {
                return null;
            }

            return await this.mongoDbRepository.GetBlogElementAsync(blogId);
        }
    }
}