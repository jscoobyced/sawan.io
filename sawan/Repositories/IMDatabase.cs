namespace sawan.Repositories
{
    using MongoDB.Driver;

    public interface IMDatabase
    {
        IMongoDatabase GetDatabase();
    }
}