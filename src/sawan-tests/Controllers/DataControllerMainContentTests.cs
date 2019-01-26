namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Xunit;

    public class DataControllerMainContentTests
    {
        [Fact]
        public void WithNullMainContentService()
        {
            var controller = new DataControllerBuilder()
                .WithMainContentService(null)
                .Build();
            var reason = "because it should return default empty MainContent data.";
            MainContent result = null;
            Func<Task> blogPage = async () => result = await controller.GetMainContent(Language.English);
            blogPage.Should().NotThrow<NullReferenceException>(reason);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public void WithUnknownLanguageMainContentService()
        {
            var mainContent = new MainContent()
            {
                NavigationMenuContent = new NavigationMenuContent()
                {
                    Home = "Home"
                }
            };

            var controller = new DataControllerBuilder()
                .WithMainContentService(
                    new MainContentServiceBuilder()
                    .WithLanguageMainContent(mainContent, Language.English)
                    .Build())
                .Build();
            var reason = "because it should return english data when language is unknown.";
            MainContent result = null;
            Func<Task> blogPage = async () => result = await controller.GetMainContent((Language)20);
            blogPage.Should().NotThrow<NullReferenceException>(reason);
            result.Should().NotBeNull(reason);
        }

    }
}