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
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly IPairingService pairingService;
        private readonly IMainContentService mainContentService;
        private readonly IBlogContentService blogContentService;

        public DataController(
            IPairingService pairingService,
            IMainContentService mainContentService,
            IBlogContentService blogContentService)
        {
            this.pairingService = pairingService;
            this.mainContentService = mainContentService;
            this.blogContentService = blogContentService;
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
        public async Task<BlogElement> GetBlogContent(int blogId)
        {
            if (this.blogContentService == null)
            {
                return new BlogElement();
            }

            return await this.blogContentService.GetBlogElementAsync(blogId);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("blog/post")]
        public async Task<bool> PostBlog([FromBody] BlogElementRequest blogElementRequest)
        {
            if (this.blogContentService == null || blogElementRequest?.BlogElement == null)
            {
                return false;
            }
            return await this.blogContentService.SaveBlogElementAsync(blogElementRequest.BlogElement);
        }
    }
}