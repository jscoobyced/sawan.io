namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbBlogRepository
    {
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(string yearMonth, int maxResult);
        Task<DateTime> GetLastBlogDate();
        Task<BlogElement> GetBlogElementAsync(int blogId);
        Task<bool> InsertBlogElementAsync(BlogElement blogElement);
        Task<bool> UpdateBlogElementAsync(BlogElement blogElement);
    }
}