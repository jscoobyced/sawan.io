namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBlogContentService
    {
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult);

        Task<BlogElement> GetBlogElementAsync(string blogId);

        Task<bool> SaveBlogElementAsync(BlogElement blogElement);
    }
}