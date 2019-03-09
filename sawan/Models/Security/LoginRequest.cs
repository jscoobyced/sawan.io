using Newtonsoft.Json;

namespace sawan
{
    public class LoginRequest
    {
        [JsonProperty(PropertyName = "access_token")]
        public string AccessToken { get; set; }
    }
}