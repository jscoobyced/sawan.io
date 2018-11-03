using Newtonsoft.Json;

namespace sawan
{
    public class CspReportRequest
    {
        [JsonProperty(PropertyName = "csp-report")]
        public CspReport CspReport { get; set; }
    }
}