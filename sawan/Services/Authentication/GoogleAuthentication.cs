namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Options;
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

        public async Task<bool> IsAdministrator(string token)
        {
            if (string.IsNullOrWhiteSpace(token)
                || string.IsNullOrWhiteSpace(this.options.Value.Authentication))
            {
                return false;
            }

            var headers = new Dictionary<string, string>()
            {
                {"Authorization", "Bearer " + token}
            };
            var result = await this.restConnector.GetAsync("https://www.googleapis.com/userinfo/v2/me", headers);
            if (result != null)
            {
                var googleUser = JsonConvert.DeserializeObject<GoogleUser>(result);
                if (googleUser.Id == this.options.Value.Authentication)
                {
                    return true;
                }
            }
            return false;
        }
    }
}