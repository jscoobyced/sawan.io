namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Services;
    using Xunit;

    public class BlogContentServiceTests
    {

        [Fact]
        public async Task GetBlogPageAsyncNullTest()
        {
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithBlogElements(null)
                .Build());
            var result = await contentService.GetBlogPageAsync(1);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogPageAsyncTest()
        {
            var blogElements = new List<BlogElement>() { new BlogElementBuilder().Build() };
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithBlogElements(blogElements)
                .Build());
            var result = await contentService.GetBlogPageAsync(1);
            result.Should().NotBeNull();
            result.Should().Equals(blogElements);
        }

        [Fact]
        public async Task GetBlogElementAsyncNullTest()
        {
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithBlogElement(null)
                .Build());
            var result = await contentService.GetBlogElementAsync(string.Empty);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementAsyncEmptyIdTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithBlogElement(blogElement)
                .Build());
            var result = await contentService.GetBlogElementAsync(string.Empty);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementAsyncTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithBlogElement(blogElement)
                .Build());
            var result = await contentService.GetBlogElementAsync("123");
            result.Should().NotBeNull();
            result.Should().Equals(blogElement);
        }

        [Fact]
        public async Task SaveNullBlogElementAsync()
        {
            var blogElement = new BlogElementBuilder().Build();
            blogElement.Article = null;
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .Build());
            var result = await contentService.SaveBlogElementAsync(null);
            result.Should().BeFalse();
            result = await contentService.SaveBlogElementAsync(blogElement);
            result.Should().BeFalse();
            blogElement = new BlogElementBuilder().Build();
            blogElement.ArticleTitle = null;
            result = await contentService.SaveBlogElementAsync(blogElement);
            result.Should().BeFalse();
        }

        [Fact]
        public async Task SaveBlogElementAsync()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithSaveStatus(true)
                .Build());
            var result = await contentService.SaveBlogElementAsync(blogElement);
            result.Should().BeTrue();
        }

        [Fact]
        public async Task SaveNewBlogElementAsync()
        {
            var blogElement = new BlogElementBuilder().Build();
            blogElement.Id = null;
            var contentService = new BlogContentService(
                new MongoDbBlogRepositoryBuilder()
                .WithSaveStatus(true)
                .Build());
            var result = await contentService.SaveBlogElementAsync(blogElement);
            result.Should().BeTrue();
        }
    }
}