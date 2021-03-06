namespace sawan.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data.Common;
    using System.Threading.Tasks;
    using MySql.Data.MySqlClient;

    public class BlogRepository : IDbBlogRepository
    {
        private readonly IDatabaseConnection databaseConnection;

        public BlogRepository(IDatabaseConnection databaseConnection)
        {
            this.databaseConnection = databaseConnection;
        }

        public async Task<BlogElement> GetBlogElementAsync(int blogId)
        {
            var blogElement = new BlogElement();
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {
                using (var command = new MySqlCommand())
                {
                    command.CommandText = "SELECT id, created, updated, title, content"
                        + " FROM blog WHERE id = ?id";
                    command.Parameters.Add(new MySqlParameter("?id", blogId));
                    command.Connection = connection;
                    var reader = await command.ExecuteReaderAsync();
                    if (reader != null)
                    {
                        while (await reader.ReadAsync())
                        {
                            blogElement = this.ReadBlogElement(reader);
                        }
                    }
                }
            }

            return blogElement;
        }

        public async Task<IEnumerable<BlogElement>> GetBlogPageAsync(string yearMonth, int maxResult)
        {
            var blogElements = new List<BlogElement>();
            if (string.IsNullOrWhiteSpace(yearMonth)
                || yearMonth.Length != 6
                || !int.TryParse(yearMonth, out int whatever))
            {
                return blogElements;
            }

            var year = int.Parse(yearMonth.Substring(0, 4));
            var month = int.Parse(yearMonth.Substring(4, 2));
            var dateFrom = new DateTime(year, month, 1);
            var dateTo = dateFrom.AddMonths(1);
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {

                using (var command = new MySqlCommand())
                {
                    command.CommandText = "SELECT id, created, updated, title, content"
                        + " FROM blog WHERE created BETWEEN ?dateFrom AND ?dateTo"
                        + " ORDER BY created DESC LIMIT ?maxResult";
                    command.Parameters.Add(new MySqlParameter("?dateFrom", dateFrom));
                    command.Parameters.Add(new MySqlParameter("?dateTo", dateTo));
                    command.Parameters.Add(new MySqlParameter("?maxResult", maxResult));
                    command.Connection = connection;
                    var reader = await command.ExecuteReaderAsync();
                    if (reader != null)
                    {
                        while (await reader.ReadAsync())
                        {
                            var blogElement = this.ReadBlogElement(reader);
                            blogElements.Add(blogElement);
                        }
                    }
                }
            }

            return blogElements;
        }

        public async Task<DateTime> GetLastBlogDate()
        {
            DateTime date = DateTime.Now;
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {
                using (var command = new MySqlCommand())
                {
                    command.CommandText = "SELECT MAX(created) FROM blog";
                    command.Connection = connection;
                    var reader = await command.ExecuteReaderAsync();
                    if (reader != null)
                    {
                        while (await reader.ReadAsync())
                        {
                            date = reader.GetDateTime(0);
                        }
                    }
                }
            }

            return date;
        }

        public async Task<bool> InsertBlogElementAsync(BlogElement blogElement)
        {
            var success = false;
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {

                using (var command = new MySqlCommand())
                {
                    command.CommandText = "INSERT INTO blog (title, content, created, updated) VALUES"
                    + "(?title, ?content, ?created, ?updated)";
                    command.Parameters.Add(new MySqlParameter("?title", blogElement.ArticleTitle));
                    command.Parameters.Add(new MySqlParameter("?content", blogElement.Article));
                    command.Parameters.Add(new MySqlParameter("?created", DateTime.Now));
                    command.Parameters.Add(new MySqlParameter("?updated", DateTime.Now));
                    command.Connection = connection;
                    var inserted = await command.ExecuteNonQueryAsync();
                    success = inserted == 1;
                }
            }

            return success;
        }

        public async Task<bool> UpdateBlogElementAsync(BlogElement blogElement)
        {
            var success = false;
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {

                using (var command = new MySqlCommand())
                {
                    command.CommandText = "UPDATE blog set title = ?title, content = ?content,"
                        + "updated = ?updated WHERE id = ?id";
                    command.Parameters.Add(new MySqlParameter("?title", blogElement.ArticleTitle));
                    command.Parameters.Add(new MySqlParameter("?content", blogElement.Article));
                    command.Parameters.Add(new MySqlParameter("?updated", DateTime.Now));
                    command.Parameters.Add(new MySqlParameter("?id", blogElement.Id));
                    command.Connection = connection;
                    var inserted = await command.ExecuteNonQueryAsync();
                    success = inserted == 1;
                }
            }

            return success;
        }

        private BlogElement ReadBlogElement(DbDataReader reader)
        {
            var blogElement = new BlogElement();
            blogElement.Id = reader.GetInt32(0);
            blogElement.BlogDate = reader.GetDateTime(1);
            blogElement.UpdateDate = reader.GetDateTime(2);
            blogElement.ArticleTitle = reader.GetString(3);
            blogElement.Article = reader.GetString(4);
            return blogElement;
        }
    }
}