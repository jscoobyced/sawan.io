namespace sawan.tests
{
    using System;

    public class BlogElementBuilder
    {
        public BlogElement Build()
        {
            return new BlogElement()
            {
                Article = "",
                ArticleTitle = "",
                BlogDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                Id = 1
            };

        }
    }
}