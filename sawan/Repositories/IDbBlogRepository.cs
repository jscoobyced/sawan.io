namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbBlogRepository
    {
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult);
        Task<IEnumerable<BlogLink>> GetBlogListAsync(int maxResult);
        Task<BlogElement> GetBlogElementAsync(string blogId);
        Task<bool> InsertBlogElementAsync(string blogElement);
        Task<bool> InsertBlogElementAsync(IEnumerable<BlogElement> blogElements);
        Task<bool> UpdateBlogElementAsync(BlogElement blogElement);
    }
}