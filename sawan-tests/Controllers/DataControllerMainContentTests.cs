namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Xunit;

    public class DataControllerMainContentTests
    {
        private readonly MainContentBuilder mainContentBuilder = new MainContentBuilder();

        [Fact]
        public void WithNullMainContentService()
        {
            var controller = new DataControllerBuilder()
                .WithContentService(null)
                .Build();
            var reason = "because it should return default empty MainContent data.";
            MainContent result = null;
            Func<Task> blogPage = async () => result = await controller.GetMainContent(Language.English);
            blogPage.Should().NotThrow<NullReferenceException>(reason);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public void WithValidLanguageMainContentService()
        {

            var controller = new DataControllerBuilder()
                .WithContentService(
                    new ContentServiceBuilder()
                    .WithLanguageMainContent(this.mainContentBuilder.Build(), Language.English)
                    .Build())
                .Build();
            var reason = "because it should return english data when language is unknown.";
            MainContent result = null;
            Func<Task> blogPage = async () => result = await controller.GetMainContent(Language.English);
            blogPage.Should().NotThrow<NullReferenceException>(reason);
            result.Should().NotBeNull(reason);
        }
    }
}