namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IMainContentService
    {
        Task<MainContent> GetMainContentAsync(Language language);
    }
}