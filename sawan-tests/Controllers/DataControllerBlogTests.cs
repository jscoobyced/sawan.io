namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Xunit;

    public class DataControllerBlogTests
    {
        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public async void GetDefaultBlogPageTest(int maxResults)
        {
            var controller = new DataControllerBuilder().Build();

            var blogElements = await controller.GetBlogPage(maxResults);

            Assert.NotNull(blogElements);
        }

        [Fact]
        public async void GetBlogPageTest()
        {
            var blogElement = new BlogElement()
            {
                Article = "",
                ArticleTitle = "",
                BlogDate = DateTime.Now,
                Id = "1"
            };
            var contentService = new ContentServiceBuilder()
                .WithBlogElements(new List<BlogElement>() { blogElement })
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(contentService)
                .Build();

            var blogElements = await controller.GetBlogPage(0);

            Assert.NotNull(blogElements);
            Assert.NotEmpty(blogElements);
            Assert.Equal(blogElement, blogElements.First());
        }
    }
}