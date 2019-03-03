namespace sawan.tests
{
    using Moq;
    using sawan.Services;

    public class AuthenticationBuilder
    {
        private bool isAdmin;

        public AuthenticationBuilder WithAdmin(bool isAdmin)
        {
            this.isAdmin = isAdmin;
            return this;
        }

        public IAuthentication Build()
        {
            var googleAuthentication = new Mock<IAuthentication>();
            googleAuthentication.Setup(x => x.IsAdministrator(It.IsAny<string>()))
            .ReturnsAsync(this.isAdmin);
            return googleAuthentication.Object;
        }
    }
}