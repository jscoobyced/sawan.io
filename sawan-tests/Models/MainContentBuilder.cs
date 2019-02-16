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
                    Links = new List<Link>()
                    {
                        new Link()
                        {
                            Text = "Name",
                            Target = "_blank",
                            Title = "Name",
                            Url = "/"
                        }
                    }
                },
                FooterContent = new FooterContent()
                {
                    Copyright = "Copyright",
                    Credits = "Credits",
                    Year = "2019"
                },
                Id = "123",
                Language = Language.English
            };
        }

    }
}