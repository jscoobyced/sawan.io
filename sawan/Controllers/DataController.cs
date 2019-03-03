namespace sawan.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using sawan.Services;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Text;
    using System.Security.Cryptography;
    using Microsoft.Extensions.Primitives;
    using System.IO;
    using Microsoft.Extensions.Options;
    using sawan.Repositories;
    using Newtonsoft.Json;

    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly IPairingService pairingService;
        private readonly IGitHubService gitHubService;
        private readonly IMainContentService mainContentService;
        private readonly IBlogContentService blogContentService;

        private readonly IAuthentication authentication;

        public DataController(
            IPairingService pairingService,
            IGitHubService gitHubService,
            IMainContentService mainContentService,
            IBlogContentService blogContentService,
            IAuthentication authentication)
        {
            this.pairingService = pairingService;
            this.gitHubService = gitHubService;
            this.mainContentService = mainContentService;
            this.blogContentService = blogContentService;
            this.authentication = authentication;
        }

        [HttpGet("pairing/{id}/{interval}")]
        public async Task<IEnumerable<Pairing>> Pairing(int id, int interval)
        {
            if (this.pairingService == null)
            {
                return await Task.Run(() =>
                {
                    return new List<Pairing>();
                });
            }

            return await this.pairingService.GetPairingAsync(id, interval);
        }

        [HttpGet("currencies")]
        public async Task<IEnumerable<SelectOption>> Currencies()
        {
            if (this.pairingService == null)
            {
                return await Task.Run(() =>
                {
                    return new List<SelectOption>();
                });
            }

            return await this.pairingService.GetCurrenciesAsync();
        }

        [HttpPost("github")]
        public async Task<IActionResult> Update()
        {
            if (this.gitHubService == null)
            {
                return NotFound();
            }

            Request?.Headers?.TryGetValue(GitHubHeader.XGitHubEvent, out StringValues eventName);
            Request?.Headers?.TryGetValue(GitHubHeader.XHubSignature, out StringValues signature);
            Request?.Headers?.TryGetValue(GitHubHeader.XGitHubDelivery, out StringValues delivery);

            using (var reader = new StreamReader(Request?.Body))
            {
                var payload = await reader.ReadToEndAsync();

                if (this.gitHubService.IsGithubPushAllowed(payload, eventName, signature))
                {
                    return Ok();
                }
            }

            return Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> CspReport([FromBody] CspReportRequest request)
        {
            await Task.Run(() =>
            {
                // Process report
            });
            return Ok();
        }

        [HttpGet("main/{language}")]
        public async Task<MainContent> GetMainContent(Language language)
        {
            if (this.mainContentService == null)
            {
                return new MainContent();
            }

            return await this.mainContentService.GetMainContentAsync(language);
        }

        [HttpGet("blogpage/{maxResult}")]
        public async Task<IEnumerable<BlogElement>> GetBlogPage(int maxResult)
        {
            if (this.blogContentService == null)
            {
                return new List<BlogElement>();
            }

            return await this.blogContentService.GetBlogPageAsync(maxResult);
        }

        [HttpGet("blog/{blogId}")]
        public async Task<BlogElement> GetBlogContent(string blogId)
        {
            if (this.blogContentService == null)
            {
                return new BlogElement();
            }

            return await this.blogContentService.GetBlogElementAsync(blogId);
        }

        [HttpPost("blog/post")]
        public async Task<bool> PostBlog([FromBody] BlogElementRequest blogElementRequest)
        {
            if (this.blogContentService == null || blogElementRequest?.BlogElement == null)
            {
                return false;
            }

            // TODO: super ugly way to check security. Will be improved to intercept
            // request at a middleware level. This is just short term to enable editing
            var isAdmin = await this.authentication.IsAdministrator(blogElementRequest.Token);
            if (!isAdmin)
            {
                return false;
            }

            return await this.blogContentService.SaveBlogElementAsync(blogElementRequest.BlogElement);
        }
    }
}