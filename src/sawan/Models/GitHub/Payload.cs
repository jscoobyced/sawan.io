namespace sawan
{
    using Newtonsoft.Json;

    public class Payload
    {
        [JsonProperty(PropertyName = "action")]
        public string Action { get; set; }

        [JsonProperty(PropertyName = "release")]
        public Release Release { get; set; }

        [JsonProperty(PropertyName = "repository")]
        public object Repository { get; set; }

        [JsonProperty(PropertyName = "sender")]
        public object Sender { get; set; }
    }
}