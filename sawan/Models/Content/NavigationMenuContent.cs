namespace sawan
{
    public class NavigationMenuContent
    {
        public string Home { get; set; }
        public string WebsiteName { get; set; }
        public string Applications { get; set; }
        public string CryptoCurrency { get; set; }
        public string HealthMonitor { get; set; }
        public string About { get; set; }
        public string Information { get; set; }
        public string Resume { get; set; }

        public enum Ids {
            About = 1,
            Applications = 2,
            CryptoCurrency = 3,
            HealthMonitor = 4,
            Home = 5,
            WebsiteName = 6,
            Information = 7,
            Resume = 8

        }
    }
}