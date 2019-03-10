namespace sawan.tests
{
    using System.Threading.Tasks;
    using FluentAssertions;
    using Microsoft.AspNetCore.Mvc;
    using Xunit;

    public class UserControllerTests
    {
        [Fact]
        public async Task AuthenticateFailTest()
        {
            var loginRequest = new LoginRequest()
            {
                AccessToken = "saduhfiosaudfh aisu fha s"
            };
            var userController = new UserControllerBuilder()
                .WithAuthentication(new AuthenticationBuilder().Build())
                .Build();
            var result = await userController.Authenticate(loginRequest);
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<BadRequestObjectResult>();
        }

        [Fact]
        public async Task AuthenticateSuccessTest()
        {
            var loginRequest = new LoginRequest()
            {
                AccessToken = "saduhfiosaudfh aisu fha s"
            };
            var googleUser = new GoogleUser();
            var userController = new UserControllerBuilder()
                .WithAuthentication(new AuthenticationBuilder()
                    .WithGoogleUser(googleUser)
                    .Build())
                .Build();
            var result = await userController.Authenticate(loginRequest);
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<OkObjectResult>();
        }
    }
}