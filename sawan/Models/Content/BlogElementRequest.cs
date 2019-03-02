namespace sawan
{
    using Newtonsoft.Json;

    public class BlogElementRequest
    {
        [JsonProperty(PropertyName = "blogElement")]
        public BlogElement BlogElement { get; set; }
    }
}