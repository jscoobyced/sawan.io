namespace sawan.Repositories
{
    using System.Threading.Tasks;

    public interface IMongoDbRepository
    {
        Task<MainContent> GetMainContent(Language language);
    }
}