namespace sawan.Services
{
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Repositories;
    using System.Globalization;

    public class BlogContentService : IBlogContentService
    {
        private readonly IDbBlogRepository dbBlogRepository;

        public BlogContentService(IDbBlogRepository dbBlogRepository)
        {
            this.dbBlogRepository = dbBlogRepository;
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(string yearMonth, int maxResult)
        {
            var result = await this.dbBlogRepository.GetBlogPageAsync(yearMonth, maxResult);
            if (result != null && !result.Any())
            {
                var date = await this.dbBlogRepository.GetLastBlogDate();
                result = await this.dbBlogRepository.GetBlogPageAsync(date.ToString("yyyyMM", CultureInfo.InvariantCulture), maxResult);
            }

            return result;
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