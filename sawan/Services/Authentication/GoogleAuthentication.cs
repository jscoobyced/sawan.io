namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;
    using sawan.Repositories;

    public class GoogleAuthentication : IAuthentication
    {
        private readonly IRestConnector restConnector;
        private readonly IOptions<AppSettings> options;


        public GoogleAuthentication(IRestConnector restConnector, IOptions<AppSettings> options)
        {
            this.restConnector = restConnector;
            this.options = options;
        }

        public async Task<GoogleUser> Login(string token)
        {
            if (string.IsNullOrWhiteSpace(token)
                || string.IsNullOrWhiteSpace(this.options.Value.Authentication.GoogleKey))
            {
                return null;
            }

            var headers = new Dictionary<string, string>()
            {
                {"Authorization", "Bearer " + token}
            };
            var result = await this.restConnector.GetAsync(this.options.Value.Authentication.ProfileUrl, headers);
            if (result != null)
            {
                var googleUser = JsonConvert.DeserializeObject<GoogleUser>(result);
                if (googleUser.Id == this.options.Value.Authentication.GoogleKey)
                {
                    googleUser.Group = Role.Admin;
                    this.CreateJwtToken(googleUser);
                    return googleUser;
                }
            }

            return null;
        }

        private void CreateJwtToken(GoogleUser googleUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.options.Value.Authentication.JwtKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, googleUser.Id),
                    new Claim(ClaimTypes.Role, googleUser.Group)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            googleUser.Token = tokenHandler.WriteToken(token);
        }
    }
}