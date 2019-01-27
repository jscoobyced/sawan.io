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
        public void WithNullMainContentService()
        {
            var controller = new DataControllerBuilder()
                .WithMainContentService(null)
                .Build();

            IEnumerable<BlogElement> result = null;
            Func<Task> blogPage = async () => result = await controller.GetBlogPage(1, 1);
            blogPage.Should().NotThrow<NullReferenceException>("because it should return default empty BlogElement data.");
            result.Should().NotBeNull(ResultEmptyList);
        }
    }
}