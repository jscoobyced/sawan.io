namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IDbMainContentRepository
    {
        Task<MainContent> GetMainContentAsync(Language language);
    }
}