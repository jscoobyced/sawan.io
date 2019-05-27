namespace sawan
{
    public class FooterContent
    {
        public string Copyright { get; set; }
        public string Credits { get; set; }
        public string Year { get; set; }

        public enum Ids {
            Copyright = 9,
            Year = 10
        }
    }
}