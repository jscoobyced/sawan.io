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
        public async Task<IActionResult> Receive()
        {
            Request.Headers.TryGetValue("X-GitHub-Event", out StringValues eventName);
            Request.Headers.TryGetValue("X-Hub-Signature", out StringValues signature);
            Request.Headers.TryGetValue("X-GitHub-Delivery", out StringValues delivery);

            using (var reader = new StreamReader(Request.Body))
            {
                var payload = await reader.ReadToEndAsync();

                if (this.gitHubService.IsGithubPushAllowed(payload, eventName, signature))
                {
                    return Ok();
                }
            }

            return Unauthorized();
        }
    }
}