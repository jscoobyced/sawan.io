namespace sawan.Repositories
{
    using System;
    using System.Data;
    using System.Diagnostics;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using MySql.Data.MySqlClient;

    public class MariaDBDatabaseConnection : IDatabaseConnection, IDisposable
    {
        private MySqlConnection connection;

        private readonly IOptions<AppSettings> options;

        public MariaDBDatabaseConnection(IOptions<AppSettings> options)
        {
            this.options = options;
        }

        public async Task<MySqlConnection> GetConnectionAsync()
        {
            if (this.connection == null)
            {
                this.connection = new MySqlConnection(this.options.Value.MariaDB.ConnectionString);
                Debug.WriteLine("Opening database connection.");
                await this.connection.OpenAsync();
            }

            return this.connection;
        }

        public void Dispose()
        {
            if (this.connection != null && this.connection.State == ConnectionState.Open)
            {
                this.connection.Close();
                Debug.WriteLine("Closing database connection.");
            }
        }
    }
}