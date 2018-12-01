
namespace sawan.Services
{
    using System;
    using System.Diagnostics;
    using System.Security.Cryptography;
    using System.Text;
    using Microsoft.Extensions.Options;
    using Newtonsoft.Json;

    public class GitHubService : IGitHubService
    {
        private readonly IOptions<AppSettings> options;
        private readonly string Release = "release";
        private readonly string Sha1Prefix = "sha1=";

        public GitHubService(IOptions<AppSettings> options)
        {
            this.options = options;
        }

        public bool IsGithubPushAllowed(string payload, string eventName, string signatureWithPrefix)
        {
            if (string.IsNullOrWhiteSpace(payload)
            || string.IsNullOrWhiteSpace(eventName)
            || !Release.Equals(eventName)
            || string.IsNullOrWhiteSpace(signatureWithPrefix)
            || !signatureWithPrefix.StartsWith(Sha1Prefix, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var signature = signatureWithPrefix.Substring(Sha1Prefix.Length);
            var secret = Encoding.ASCII.GetBytes(this.options.Value.GitHub.WebHookToken);
            var payloadBytes = Encoding.ASCII.GetBytes(payload);

            using (var hmSha1 = new HMACSHA1(secret))
            {
                var hash = hmSha1.ComputeHash(payloadBytes);

                var hashString = ToHexString(hash);

                if (hashString.Equals(signature))
                {
                    var payloadObject = JsonConvert.DeserializeObject<Payload>(payload);

                    var version = payloadObject.Release.TagName;
                    Update(this.options.Value.GitHub.UpdateScript, version);
                    return true;
                }
            }

            return false;
        }

        private static string ToHexString(byte[] bytes)
        {
            var builder = new StringBuilder(bytes.Length * 2);
            foreach (byte b in bytes)
            {
                builder.AppendFormat("{0:x2}", b);
            }

            return builder.ToString();
        }

        private static void Update(string script, string version)
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = script;
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;

            psi.Arguments = version;
            Process p = Process.Start(psi);
            p.WaitForExit();
        }
    }
}