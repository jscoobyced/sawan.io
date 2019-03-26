namespace sawan.Repositories
{
    using Microsoft.Extensions.Options;
    using MongoDB.Driver;

    public class MDatabase : IMDatabase
    {
        private IMongoDatabase database;

        private readonly IOptions<AppSettings> appSettings;

        public MDatabase(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings;
        }

        public IMongoDatabase GetDatabase()
        {
            if (this.database == null
                && !string.IsNullOrWhiteSpace(this.appSettings.Value.Mongo?.ConnectionString)
                && !string.IsNullOrWhiteSpace(this.appSettings.Value.Mongo?.Database))
            {
                var client = new MongoClient(this.appSettings.Value.Mongo.ConnectionString);
                this.database = client.GetDatabase(this.appSettings.Value.Mongo.Database);
            }

            return this.database;
        }
    }
}