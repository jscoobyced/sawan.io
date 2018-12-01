namespace sawan.tests
{
    using System.Linq;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using sawan;
    using sawan.Controllers;
    using sawan.Services;
    using System.IO;
    using System.Text;

    public class DataControllerBuilder
    {
        private IPairingService pairingService;

        private IGitHubService gitHubService;

        private IDictionary<string, string> headers = new Dictionary<string, string>();

        private string body = string.Empty;

        public DataControllerBuilder WithPairingService(IPairingService pairingService)
        {
            this.pairingService = pairingService;
            return this;
        }

        public DataControllerBuilder WithGitHubService(IGitHubService gitHubService)
        {
            this.gitHubService = gitHubService;
            return this;
        }

        public DataControllerBuilder WithRequestBody(string body)
        {
            this.body = body;
            return this;
        }

        public DataControllerBuilder WithGitHubHeaders()
        {
            this.WithHttpHeader(GitHubHeader.XGitHubDelivery, "test");
            this.WithHttpHeader(GitHubHeader.XGitHubEvent, "test");
            this.WithHttpHeader(GitHubHeader.XHubSignature, "test");
            return this;
        }

        public DataControllerBuilder WithHttpHeader(string key, string value)
        {
            this.headers.Add(key, value);
            return this;
        }

        public DataController Build()
        {
            var httpContext = new DefaultHttpContext();
            foreach (KeyValuePair<string, string> header in this.headers)
            {
                if (!string.IsNullOrWhiteSpace(header.Key))
                {
                    httpContext.Request.Headers[header.Key] = header.Value;
                }
            }

            httpContext.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes("test"));

            var controllerContext = new ControllerContext()
            {
                HttpContext = httpContext,
            };

            return new DataController(this.pairingService, this.gitHubService)
            {
                ControllerContext = controllerContext
            };
        }
    }
}