namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using sawan.Services;
    using Xunit;

    public class ContentServiceTests
    {

        [Fact]
        public async Task WithUnknownLanguageMainContentService()
        {

            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .WithLanguage(Language.English)
                .Build());
            var reason = "because it should return english data when language is unknown.";
            var result = await mainContentService.GetMainContentAsync((Language)20);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async Task GetMainContentWithLanguage()
        {
            var mainContentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithMainContent(new MainContentBuilder().Build())
                .Build());
            var result = await mainContentService.GetMainContentAsync(Language.English);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task GetBlogPageAsyncNullTest()
        {
            var contentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithBlogElements(null)
                .Build());
            var result = await contentService.GetBlogPageAsync(1);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogPageAsyncTest()
        {
            var blogElements = new List<BlogElement>() { new BlogElementBuilder().Build() };
            var contentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithBlogElements(blogElements)
                .Build());
            var result = await contentService.GetBlogPageAsync(1);
            result.Should().NotBeNull();
            result.Should().Equals(blogElements);
        }

        [Fact]
        public async Task GetBlogElementAsyncNullTest()
        {
            var contentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithBlogElement(null)
                .Build());
            var result = await contentService.GetBlogElementAsync(string.Empty);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementAsyncEmptyIdTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithBlogElement(blogElement)
                .Build());
            var result = await contentService.GetBlogElementAsync(string.Empty);
            result.Should().BeNull();
        }

        [Fact]
        public async Task GetBlogElementAsyncTest()
        {
            var blogElement = new BlogElementBuilder().Build();
            var contentService = new ContentService(
                new MongoDbRepositoryBuilder()
                .WithBlogElement(blogElement)
                .Build());
            var result = await contentService.GetBlogElementAsync("123");
            result.Should().NotBeNull();
            result.Should().Equals(blogElement);
        }
    }
}