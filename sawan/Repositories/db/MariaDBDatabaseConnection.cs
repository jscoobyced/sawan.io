namespace sawan.Repositories
{
    using System;
    using System.Data;
    using System.Diagnostics;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MySql.Data.MySqlClient;

    public class MariaDBDatabaseConnection : IDatabaseConnection
    {
        private readonly IOptions<AppSettings> options;

        public MariaDBDatabaseConnection(IOptions<AppSettings> options)
        {
            this.options = options;
        }

        public async Task<MySqlConnection> GetConnectionAsync()
        {
            var connection = new MySqlConnection(this.options.Value.MariaDB.ConnectionString);
            Debug.WriteLine("Opening database connection.");
            await connection.OpenAsync();
            return connection;
        }
    }
}