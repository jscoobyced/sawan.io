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
        [InlineData("123", "123", true)]
        [InlineData("", "123", false)]
        [InlineData("123", "", false)]
        [InlineData("", "", false)]
        [InlineData(null, null, false)]
        [InlineData("123", "1234", false)]
        public async Task IsAdministratorTests(string userId, string adminId, bool expected)
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
                    .WithAuthentication(adminId)
                    .Build());
            var result = await googleAuthentication.IsAdministrator("token");
            result.Should().Be(expected);
        }
    }
}