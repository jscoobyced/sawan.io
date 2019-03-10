namespace sawan.tests
{
    using sawan.Controllers;
    using sawan.Services;

    public class UserControllerBuilder
    {
        private IAuthentication authentication;

        public UserControllerBuilder WithAuthentication(IAuthentication authentication)
        {
            this.authentication = authentication;
            return this;
        }

        public UserController Build()
        {
            var userController = new UserController(this.authentication);
            return userController;
        }
    }
}