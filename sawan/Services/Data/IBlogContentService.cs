namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBlogContentService
    {
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(string yearMonth, int maxResult);

        Task<BlogElement> GetBlogElementAsync(int blogId);

        Task<bool> SaveBlogElementAsync(BlogElement blogElement);
    }
}