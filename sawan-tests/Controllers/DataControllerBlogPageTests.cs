namespace sawan.tests
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using FluentAssertions;
    using Xunit;

    public class DataControllerBlogPageTests
    {
        private const string ResultEmptyList = "because the default result should be an empty list.";

        [Fact]
        public async Task WithNullMainContentService()
        {
            var controller = new DataControllerBuilder()
                .WithContentService(null)
                .Build();

            var result = await controller.GetBlogPage(1);
            result.Should().NotBeNull(ResultEmptyList);
        }
    }
}