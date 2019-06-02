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

        public async Task<BlogElement> GetBlogElementAsync(int blogId)
        {
            if (blogId <= 0)
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

            // Should update to allow only specific HTML tags
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

            if (blogElement.Id <= 0)
            {
                return await this.dbBlogRepository.InsertBlogElementAsync(safeBlogElement);
            }

            return await this.dbBlogRepository.UpdateBlogElementAsync(safeBlogElement);
        }
    }
}