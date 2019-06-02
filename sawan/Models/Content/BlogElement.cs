namespace sawan
{
    using System;

    public class BlogElement
    {
        public int Id { get; set; }
        public DateTime BlogDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Article { get; set; }
        public string ArticleTitle { get; set; }
    }
}