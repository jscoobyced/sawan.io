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

        public async Task<bool> SaveBlogElementAsync(BlogElement blogElement)
        {
            if (blogElement?.Article == null
                || blogElement?.ArticleTitle == null)
            {
                return false;
            }

            // TODO: Allow only specific HTML tags
            var safeArticle = blogElement.Article;
            var safeArticleTitle = blogElement.ArticleTitle;
            var safeBlogElement = new BlogElement()
            {
                Article = safeArticle,
                ArticleTitle = safeArticleTitle,
                BlogDate = blogElement.BlogDate,
                Id = blogElement.Id
            };

            if (string.IsNullOrWhiteSpace(blogElement.Id))
            {
                var blogElements = new List<BlogElement>() { safeBlogElement };
                // Add support to create new blog entry when user authentication is done
                // return await this.mongoDbRepository.InsertBlogElementAsync(blogElements);
                return true;
            }

            // Remove this after user authentication is done
            await Task.Run(() => { });
            // return await this.mongoDbRepository.UpdateBlogElementAsync(safeBlogElement);
            return true;
        }
    }
}