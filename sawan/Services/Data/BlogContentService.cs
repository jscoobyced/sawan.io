namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class BlogContentService : IBlogContentService
    {
        private readonly IDbBlogRepository dbBlogRepository;

        public BlogContentService(IDbBlogRepository dbBlogRepository)
        {
            this.dbBlogRepository = dbBlogRepository;
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult)
        {
            return await this.dbBlogRepository.GetBlogPageAsync(maxResult);
        }

        public async Task<BlogElement> GetBlogElementAsync(string blogId)
        {
            if (string.IsNullOrWhiteSpace(blogId))
            {
                return null;
            }

            return await this.dbBlogRepository.GetBlogElementAsync(blogId);
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
                UpdateDate = blogElement.UpdateDate,
                Id = blogElement.Id
            };

            if (string.IsNullOrWhiteSpace(blogElement.Id))
            {
                var blogElements = new List<BlogElement>() { safeBlogElement };
                return await this.dbBlogRepository.InsertBlogElementAsync(blogElements);
            }

            return await this.dbBlogRepository.UpdateBlogElementAsync(safeBlogElement);
        }
    }
}