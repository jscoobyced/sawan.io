namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbRepository
    {
        Task<MainContent> GetMainContent(Language language);
        Task<bool> InsertMainContent(string mainContent);
        Task<bool> InsertMainContent(MainContent mainContent);
        Task<IEnumerable<BlogElement>> GetBlogPage(int maxResult);
        Task<BlogElement> GetBlogElement(string blogId);
        Task<bool> InsertBlogElement(string blogElement);
        Task<bool> InsertBlogElement(IEnumerable<BlogElement> blogElement);
    }
}