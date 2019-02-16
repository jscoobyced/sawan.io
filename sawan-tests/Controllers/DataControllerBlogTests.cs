using Xunit;

namespace sawan.tests
{
    public class DataControllerBlogTests
    {
        [Theory]
        [InlineData(0, 0)]
        [InlineData(0, 1)]
        [InlineData(1, 0)]
        public void GetBlogPageTest(long from, int maxResults)
        {
            var controller = new DataControllerBuilder().Build();

            var blogElements = controller.GetBlogPage(from, maxResults);

            Assert.NotNull(blogElements);
        }
    }
}