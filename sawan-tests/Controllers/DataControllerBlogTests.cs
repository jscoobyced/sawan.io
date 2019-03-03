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
            var contentService = new BlogContentServiceBuilder()
                .WithBlogElements(new List<BlogElement>() { blogElement })
                .Build();
            var controller = new DataControllerBuilder()
                .WithBlogContentService(contentService)
                .Build();

            var blogElements = await controller.GetBlogPage(0);

            blogElements.Should().NotBeEmpty();
            blogElements.First().Should().Be(blogElement);
        }

        [Fact]
        public async Task GetBlogContentTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentServiceBuilder()
                .WithBlogElement(blogElement)
                .Build();
            var controller = new DataControllerBuilder()
                .WithBlogContentService(contentService)
                .Build();

            var result = await controller.GetBlogContent("0");

            result.Should().NotBeNull();
            result.Should().Be(blogElement);
        }

        [Fact]
        public async Task GetBlogContentNullTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentServiceBuilder()
                .WithBlogElement(blogElement)
                .Build();
            var controller = new DataControllerBuilder()
                .WithBlogContentService(null)
                .Build();

            var result = await controller.GetBlogContent("0");
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task PostNullBlogElementTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new MainContentServiceBuilder()
                .Build();
            var controller = new DataControllerBuilder()
                .WithMainContentService(contentService)
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
                .WithBlogContentService(null)
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
                .WithMainContentService(new MainContentServiceBuilder().Build())
                .Build();

            var result = await controller.PostBlog(null);
            result.Should().BeFalse();

            result = await controller.PostBlog(new BlogElementRequest());
            result.Should().BeFalse();
        }

        [Theory]
        [InlineData(true, true, true)]
        [InlineData(true, false, false)]
        [InlineData(false, true, false)]
        [InlineData(false, false, false)]
        public async Task PostBlogElementTest(bool saveStatus, bool isAdmin, bool expected)
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentServiceBuilder()
                .WithSaveStatus(saveStatus)
                .Build();
            var controller = new DataControllerBuilder()
                .WithBlogContentService(contentService)
                .WithAuthentication(
                    new AuthenticationBuilder()
                    .WithAdmin(isAdmin)
                    .Build())
                .Build();

            var result = await controller.PostBlog(new BlogElementRequest()
            {
                BlogElement = blogElement
            });

            result.Should().Be(expected);
        }
    }
}