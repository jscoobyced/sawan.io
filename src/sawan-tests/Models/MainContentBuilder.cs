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
                    Home = "Home"
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
                }
            };
        }

    }
}