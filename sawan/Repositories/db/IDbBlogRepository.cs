namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbBlogRepository
    {
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult);
        Task<BlogElement> GetBlogElementAsync(int blogId);
        Task<bool> InsertBlogElementAsync(BlogElement blogElement);
        Task<bool> UpdateBlogElementAsync(BlogElement blogElement);
    }
}