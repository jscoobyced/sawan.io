namespace sawan.tests
{
    using Xunit;
    using FluentAssertions;
    using sawan.Controllers;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;

    public class DataControllerCspReportTests
    {
        [Fact]
        public async void CspReport()
        {
            var dataController = new DataControllerBuilder()
                .Build();
            var cspReportRequest = new CspReportRequest()
            {
                CspReport = new CspReport()
                {
                    BlockedUri = "/CspReport",
                    DocumentUri = "self",
                    OriginalPolicy = "self",
                    EffectiveDirective = "self",
                    Referrer = "self",
                    ViolatedDirective = "script-src",
                    StatusCode = 200
                }
            };

            var actionResult = await dataController.CspReport(cspReportRequest);

            actionResult.Should().NotBeNull("because the default response from HomeController is a valid result.");
            actionResult.Should().BeAssignableTo<OkResult>("because the default response from HomeController is a valid OkResult.");
        }
    }
}