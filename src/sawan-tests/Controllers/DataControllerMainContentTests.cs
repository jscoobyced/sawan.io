using Xunit;

namespace sawan.tests
{
    public class DataControllerMainContentTests
    {
        [Fact]
        public void GetBlogPageTest()
        {
            var controller = new DataControllerBuilder().Build();

            var mainContent = controller.GetMainContent(Language.English);

            Assert.NotNull(mainContent);
        }
    }
}