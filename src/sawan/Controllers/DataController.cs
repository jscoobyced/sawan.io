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

    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly IPairingService pairingService;
        private readonly IGitHubService gitHubService;

        public DataController(IPairingService pairingService, IGitHubService gitHubService)
        {
            this.pairingService = pairingService;
            this.gitHubService = gitHubService;
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
            await Task.Run(() =>
            {
                // Process report
            });
            var content = new MainContent()
            {
                NavigationMenuContent = new NavigationMenuContent()
                {
                    About = "About",
                    Applications = "Applications",
                    CryptoCurrency = "Crypto-Currency",
                    HealthMonitor = "Health Monitor",
                    Home = "Home",
                    WebsiteName = "sawan.io"
                },
                FooterContent = new FooterContent()
                {
                    Copyright = "Copyright",
                    Credits = "sawan.io",
                    Year = "2018 - " + DateTime.Now.Year
                },
                MenuContent = new MenuContent()
                {
                    Links = new List<Link>()
                    {
                        new Link()
                        {
                            Target = "_blank",
                            Text = "Home",
                            Title = "Home",
                            Url = "#"
                        }
                    }
                }
            };

            return content;
        }

        [HttpGet("blog/{from}/{maxResult}")]
        public async Task<IEnumerable<BlogElement>> GetBlogPage(long from, int maxResult)
        {
            await Task.Run(() =>
            {
                // Process report
            });

            return new List<BlogElement>()
                {
                    new BlogElement()
                    {
                        ArticleTitle = "Latest news - 2018-11-15",
                        Article = "Grand opening of sawan.io.<br />This website is about my"
                            + " personal training on various web-technologies: TypeScript, webpack, ReactJS, Secure HTTP"
                            + "  headers... It includes a simple (and a bit naive) crypto-currency analyser: it can"
                            + " suggest you to sell or buy. Use at your own risk, it is amateur predictions, you have"
                            + " been warned.<br />There will be also an application to track health metrics (weight,"
                            + " % body fat, vascular fat ratio...). Or maybe not, this might be my next project.<br />"
                            + " This project is open-sourced on <a target=\"_blank\""
                            + " href=\"https://github.com/jscoobyced/sawan.io\">Github</a>. Enjoy and have fun."
                    },
                    new BlogElement()
                    {
                        ArticleTitle = "Lorem Ipsum",
                        Article = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                            + " ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                            + " aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit "
                            + " cillum dolore eu fugiat nulla pariatur.<br />Excepteur sint occaecat cupidatat non proident, "
                            + " culpa qui officia deserunt mollit anim id est laborum. Commodo qui imperdiet massa tincidunt."
                            + " Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit"
                            + " euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus"
                            + " vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi"
                            + " porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque"
                            + " fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Vitae suscipit tellus"
                            + " mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio"
                            + " facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non."
                            + " Turpis nunc eget lorem dolor."
                    },
                    new BlogElement()
                    {
                        ArticleTitle = "Some other news",
                        Article = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
                            + " et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut"
                            + " aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit"
                            + " cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt"
                            + " culpa qui officia deserunt mollit anim id est laborum. Commodo quis imperdiet massa tincidunt."
                            + " Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit"
                            + " euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus"
                            + " vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi"
                            + " porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque"
                            + " fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Nisi vitae suscipit"
                            + " mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio"
                            + " facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non."
                            + " Turpis nunc eget lorem dolor. Duis aute irure dolor in reprehenderit in voluptate velit esse"
                            + " cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt "
                            + " culpa qui officia deserunt mollit anim id est laborum. Commodo quis imperdiet massa tincidunt."
                            + " Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit"
                            + " euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus"
                            + " vestibulum lorem sed risus ultricies tristique nulla.<br />Egestas erat imperdiet sed euismod"
                            + " porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque"
                            + " fermentum. Morbi tristique senectus et netus et malesuada fames. Nisi vitae suscipit tellus"
                            + " mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet."
                    }
            };
        }
    }
}