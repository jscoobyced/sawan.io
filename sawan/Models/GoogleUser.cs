namespace sawan
{
    using Newtonsoft.Json;

    public class GoogleUser
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "given_name")]
        public string Firstname { get; set; }

        [JsonProperty(PropertyName = "family_name")]
        public string Lastname { get; set; }

        [JsonProperty(PropertyName = "picture")]
        public string PictureUrl { get; set; }

        [JsonProperty(PropertyName = "verified_email")]
        public bool VerifiedEmail { get; set; }

        [JsonProperty(PropertyName = "locale")]
        public string Locale { get; set; }
    }
}