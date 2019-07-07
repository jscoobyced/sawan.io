namespace sawan.tests
{
    using System;
    using System.Collections.Generic;

    public class HistoryBuilder
    {
        public List<Link> Build(string content)
        {
            return new List<Link>()
            {
                new Link()
                {
                    Url = "https://localhost/123",
                    Text = content,
                    Title = "Title 1 From History",
                    Target = "_blank",
                    Created = new DateTime(2019, 1, 1)
                },
                new Link()
                {
                    Url = "https://localhost/456",
                    Text = content,
                    Title = "Title 2 From History",
                    Target = "_blank",
                    Created = new DateTime(2019, 1, 1)
                }
            };
        }
    }
}