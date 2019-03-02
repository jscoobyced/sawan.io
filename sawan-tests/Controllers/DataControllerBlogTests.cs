namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Xunit;

    public class DataControllerBlogTests
    {
        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public async Task GetDefaultBlogPageTest(int maxResults)
        {
            var controller = new DataControllerBuilder().Build();

            var blogElements = await controller.GetBlogPage(maxResults);

            blogElements.Should().NotBeNull();
        }

        [Fact]
        public async Task GetBlogPageTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentServiceBuilder()
                .WithBlogElements(new List<BlogElement>() { blogElement })
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(contentService)
                .Build();

            var blogElements = await controller.GetBlogPage(0);

            blogElements.Should().NotBeEmpty();
            blogElements.First().Should().Be(blogElement);
        }

        [Fact]
        public async Task GetBlogContentTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentServiceBuilder()
                .WithBlogElement(blogElement)
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(contentService)
                .Build();

            var result = await controller.GetBlogContent("0");

            result.Should().NotBeNull();
            result.Should().Be(blogElement);
        }

        [Fact]
        public async Task GetBlogContentNullTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentServiceBuilder()
                .WithBlogElement(blogElement)
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(null)
                .Build();

            var result = await controller.GetBlogContent("0");
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task PostNullBlogElementTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentServiceBuilder()
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(contentService)
                .Build();

            var result = await controller.PostBlog(new BlogElementRequest()
            {
                BlogElement = null
            });

            result.Should().BeFalse();
        }

        [Fact]
        public async Task PostBlogElementNoServiceTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var controller = new DataControllerBuilder()
                .WithContentService(null)
                .Build();

            var result = await controller.PostBlog(new BlogElementRequest()
            {
                BlogElement = blogElement
            });

            result.Should().BeFalse();
        }

        [Fact]
        public async Task PostBlogElementNullServiceTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var controller = new DataControllerBuilder()
                .WithContentService(new ContentServiceBuilder().Build())
                .Build();

            var result = await controller.PostBlog(null);
            result.Should().BeFalse();

            result = await controller.PostBlog(new BlogElementRequest());
            result.Should().BeFalse();
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public async Task PostBlogElementTest(bool saveStatus)
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentServiceBuilder()
                .WithSaveStatus(saveStatus)
                .Build();
            var controller = new DataControllerBuilder()
                .WithContentService(contentService)
                .Build();

            var result = await controller.PostBlog(new BlogElementRequest()
            {
                BlogElement = blogElement
            });

            result.Should().Be(saveStatus);
        }
    }
}