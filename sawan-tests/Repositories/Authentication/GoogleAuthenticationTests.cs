namespace sawan.tests
{
    using System.Threading.Tasks;
    using FluentAssertions;
    using Newtonsoft.Json;
    using sawan.Services;
    using Xunit;

    public class GoogleAuthenticationTests
    {
        [Theory]
        [InlineData("", "123")]
        [InlineData("123", "")]
        [InlineData("", "")]
        [InlineData(null, null)]
        [InlineData("123", "1234")]
        public async Task LoginFailTests(string userId, string adminId)
        {
            var result = await this.DoTest(userId, adminId);
            result.Should().BeNull();
        }

        [Theory]
        [InlineData("123", "123")]
        public async Task LoginTests(string userId, string adminId)
        {
            var result = await this.DoTest(userId, adminId);
            result.Should().NotBeNull();
            result.Group.Should().Be(Role.Admin);
        }

        private async Task<GoogleUser> DoTest(string userId, string adminId)
        {
            var googleUser = new GoogleUser()
            {
                Id = userId
            };
            var googleUserString = JsonConvert.SerializeObject(googleUser);
            var googleAuthentication = new GoogleAuthentication(
                new RestConnectorBuilder()
                .WithResult(googleUserString)
                .Build(),
                new OptionBuilder()
                    .WithAuthentication(adminId, "this is a very well kept secret. Bla blabla. I will find you and I will hug you!")
                    .Build());
            var result = await googleAuthentication.Login("token");
            return result;
        }
    }
}