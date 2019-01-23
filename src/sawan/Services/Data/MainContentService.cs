using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace sawan.Services
{
    public class MainContentService : IMainContentService
    {
        public async Task<MainContent> GetMainContent(Language language)
        {
            await Task.Run(() =>
                {
                    // Fetch data
                });
            var content = new MainContent()
            {
                NavigationMenuContent = new NavigationMenuContent()
                {
                    About = "About",
                    Applications = "Applications",
                    CryptoCurrency = "Crypto-Currency",
                    HealthMonitor = "Health Monitor",
                    Home = "Home",
                    WebsiteName = "sawan.io"
                },
                FooterContent = new FooterContent()
                {
                    Copyright = "Copyright",
                    Credits = "sawan.io",
                    Year = "2018 - " + DateTime.Now.Year
                },
                MenuContent = new MenuContent()
                {
                    Links = new List<Link>()
                    {
                        new Link()
                        {
                            Target = "_blank",
                            Text = "Home",
                            Title = "Home",
                            Url = "#"
                        }
                    }
                }
            };

            return content;
        }
    }
}