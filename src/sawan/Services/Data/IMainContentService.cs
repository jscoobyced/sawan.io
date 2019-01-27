namespace sawan.Services
{
    using System.Threading.Tasks;

    public interface IMainContentService
    {
        Task<MainContent> GetMainContent(Language language);
    }
}