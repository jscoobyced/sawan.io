using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MySql.Data.MySqlClient;

namespace sawan.Repositories
{
    public class MainContentRepository : IDbMainContentRepository
    {
        private readonly IDatabaseConnection databaseConnection;

        public MainContentRepository(IDatabaseConnection databaseConnection)
        {
            this.databaseConnection = databaseConnection;
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            var mainContent = new MainContent
            {
                NavigationMenuContent = new NavigationMenuContent(),
                FooterContent = new FooterContent(),
                MenuContent = new MenuContent(),
                Language = language
            };
            using (var connection = await this.databaseConnection.GetConnectionAsync())
            {

                using (var command = new MySqlCommand())
                {
                    command.CommandText = "SELECT id, content FROM content WHERE lang_id = ?lang";
                    command.Connection = connection;
                    command.Parameters.Add(new MySqlParameter("?lang", language));
                    var reader = await command.ExecuteReaderAsync();
                    if (reader != null)
                    {
                        while (await reader.ReadAsync())
                        {
                            var id = reader.GetInt32(0);
                            switch (id)
                            {
                                case (int)NavigationMenuContent.Ids.About:
                                    mainContent.NavigationMenuContent.About = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.Applications:
                                    mainContent.NavigationMenuContent.Applications = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.CryptoCurrency:
                                    mainContent.NavigationMenuContent.CryptoCurrency = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.HealthMonitor:
                                    mainContent.NavigationMenuContent.HealthMonitor = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.Home:
                                    mainContent.NavigationMenuContent.Home = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.Information:
                                    mainContent.NavigationMenuContent.Information = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.Resume:
                                    mainContent.NavigationMenuContent.Resume = reader.GetString(1);
                                    break;
                                case (int)NavigationMenuContent.Ids.WebsiteName:
                                    mainContent.NavigationMenuContent.WebsiteName = reader.GetString(1);
                                    break;
                                case (int)FooterContent.Ids.Copyright:
                                    mainContent.FooterContent.Copyright = reader.GetString(1);
                                    break;
                                case (int)FooterContent.Ids.Year:
                                    mainContent.FooterContent.Year = reader.GetString(1);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }

            return mainContent;
        }
    }
}