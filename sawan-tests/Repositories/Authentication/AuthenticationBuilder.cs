namespace sawan.tests
{
    using Moq;
    using sawan.Services;

    public class AuthenticationBuilder
    {
        private GoogleUser googleUser;

        public AuthenticationBuilder WithGoogleUser(GoogleUser googleUser)
        {
            this.googleUser = googleUser;
            return this;
        }

        public IAuthentication Build()
        {
            var googleAuthentication = new Mock<IAuthentication>();
            googleAuthentication.Setup(x => x.Login(It.IsAny<string>()))
                .ReturnsAsync(this.googleUser);
            return googleAuthentication.Object;
        }
    }
}