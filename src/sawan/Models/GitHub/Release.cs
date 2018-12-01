namespace sawan
{
    using System;
    using Newtonsoft.Json;

    public class Release
    {
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }

        [JsonProperty(PropertyName = "assets_url")]
        public string AssetsUrl { get; set; }

        [JsonProperty(PropertyName = "upload_url")]
        public string UploadUrl { get; set; }

        [JsonProperty(PropertyName = "html_url")]
        public string HtmlUrl { get; set; }

        [JsonProperty(PropertyName = "id")]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "node_id")]
        public string NodeId { get; set; }

        [JsonProperty(PropertyName = "tag_name")]
        public string TagName { get; set; }

        [JsonProperty(PropertyName = "target_commitish")]
        public string TargetCommitish { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "draft")]
        public bool Draft { get; set; }

        [JsonProperty(PropertyName = "author")]
        public object Author { get; set; }

        [JsonProperty(PropertyName = "prerelease")]
        public bool PreRelease { get; set; }

        [JsonProperty(PropertyName = "created_at")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty(PropertyName = "published_at")]
        public DateTime PublishedAt { get; set; }

        [JsonProperty(PropertyName = "assets")]
        public object Assets { get; set; }

        [JsonProperty(PropertyName = "tarball_url")]
        public string TarBallUrl { get; set; }

        [JsonProperty(PropertyName = "zipball_url")]
        public string ZipBallUrl { get; set; }

        [JsonProperty(PropertyName = "body")]
        public string Body { get; set; }
    }
}