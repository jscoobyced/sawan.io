namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbMainContentRepository
    {
        Task<MainContent> GetBaseMainContent(Language language);
        Task<List<DateTime>> GetHistory();

    }
}