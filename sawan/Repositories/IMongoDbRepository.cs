namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbRepository
    {
        Task<MainContent> GetMainContent(Language language);
        Task<IEnumerable<BlogElement>> GetBlogPage(DateTime from, int maxResult);
    }
}