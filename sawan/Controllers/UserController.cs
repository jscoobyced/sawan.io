namespace sawan.Controllers
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using sawan.Services;

    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IAuthentication authentication;

        public UserController(IAuthentication authentication)
        {
            this.authentication = authentication;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]LoginRequest loginRequest)
        {
            var googleUser = await this.authentication.Login(loginRequest.AccessToken);

            if (googleUser == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(googleUser);
        }
    }
}