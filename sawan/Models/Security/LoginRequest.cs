using Newtonsoft.Json;

namespace sawan
{
    public class LoginRequest
    {
        [JsonProperty(PropertyName = "accessToken")]
        public string AccessToken { get; set; }
    }
}