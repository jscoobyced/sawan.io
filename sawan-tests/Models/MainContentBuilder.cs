namespace sawan.tests
{
    using System.Collections.Generic;

    public class MainContentBuilder
    {
        public MainContent Build()
        {
            return new MainContent()
            {
                NavigationMenuContent = new NavigationMenuContent()
                {
                    Home = "Home",
                    About = "About",
                    Applications = "Applications",
                    CryptoCurrency = "CryptoCurrency",
                    HealthMonitor = "HealthMonitor",
                    Information = "Information",
                    Resume = "Resume",
                    WebsiteName = "Website Name"
                },
                MenuContent = new MenuContent()
                {
                    HistoryMenus = new List<HistoryMenu>()
                    {
                        new HistoryMenu()
                        {
                            Entries = new List<Link>()
                            {
                                new Link()
                                {
                                    Text = "Name",
                                    Target = "_blank",
                                    Title = "Name",
                                    Url = "/"
                                }
                            },
                            Name = "Menu 1"
                        }
                    },
                    Title = "History"
                },
                FooterContent = new FooterContent()
                {
                    Copyright = "Copyright",
                    Credits = "Credits",
                    Year = "2019"
                },
                Language = Language.English
            };
        }

    }
}