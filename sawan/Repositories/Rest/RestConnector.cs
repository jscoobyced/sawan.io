namespace sawan.Repositories
{
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Runtime.Serialization.Json;
    using System.Threading.Tasks;

    public class RestConnector : IRestConnector
    {
        private readonly HttpClient client = new HttpClient();

        public async Task<string> GetAsync(string url, Dictionary<string, string> headers = null)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                return null;
            }

            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36");
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    if (!string.IsNullOrWhiteSpace(header.Key)
                    && !string.IsNullOrWhiteSpace(header.Value))
                    {
                        client.DefaultRequestHeaders.Add(header.Key, header.Value);
                    }
                }
            }
            return await client.GetStringAsync(url);
        }
    }
}