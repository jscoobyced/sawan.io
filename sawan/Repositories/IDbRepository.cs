namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbRepository
    {
        Task<MainContent> GetMainContentAsync(Language language);
        Task<bool> InsertMainContentAsync(string mainContent);
        Task<bool> InsertMainContentAsync(MainContent mainContent);
        Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult);
        Task<BlogElement> GetBlogElementAsync(string blogId);
        Task<bool> InsertBlogElementAsync(string blogElement);
        Task<bool> InsertBlogElementAsync(IEnumerable<BlogElement> blogElements);
    }
}