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
        public async Task WithNullMainContentService()
        {
            var controller = new DataControllerBuilder()
                .WithMainContentService(null)
                .Build();
            var reason = "because it should return default empty MainContent data.";
            var result = await controller.GetMainContent(Language.English);
            result.Should().NotBeNull(reason);
        }

        [Fact]
        public async Task WithValidLanguageMainContentService()
        {

            var controller = new DataControllerBuilder()
                .WithMainContentService(
                    new MainContentServiceBuilder()
                    .WithLanguageMainContent(this.mainContentBuilder.Build(), Language.English)
                    .Build())
                .Build();
            var reason = "because it should return english data when language is unknown.";
            var result = await controller.GetMainContent(Language.English);
            result.Should().NotBeNull(reason);
        }
    }
}