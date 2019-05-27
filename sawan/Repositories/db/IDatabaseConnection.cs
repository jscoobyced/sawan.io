namespace sawan.Repositories
{
    using System.Threading.Tasks;
    using MySql.Data.MySqlClient;

    public interface IDatabaseConnection
    {
        Task<MySqlConnection> GetConnectionAsync();
    }
}