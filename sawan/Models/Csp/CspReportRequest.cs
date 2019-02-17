namespace sawan
{
    using Newtonsoft.Json;

    public class CspReportRequest
    {
        [JsonProperty(PropertyName = "csp-report")]
        public CspReport CspReport { get; set; }
    }
}