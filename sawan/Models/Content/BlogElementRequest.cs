namespace sawan
{
    using Newtonsoft.Json;

    public class BlogElementRequest
    {
        [JsonProperty(PropertyName = "data")]
        public BlogElement BlogElement { get; set; }

        [JsonProperty(PropertyName = "token")]
        public string Token { get; set; }
    }
}