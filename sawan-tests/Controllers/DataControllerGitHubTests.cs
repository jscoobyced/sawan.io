namespace sawan.tests
{
    using Xunit;
    using FluentAssertions;
    using sawan.Controllers;
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using Moq;

    public class DataControllerGitHubTests
    {

        [Fact]
        public void WithNullGitHubService()
        {
            var dataController = new DataControllerBuilder()
                .WithGitHubService(null)
                .Build();

            NotFoundResult result = null;
            Func<Task> update = async () => result = (NotFoundResult)(await dataController.Update());
            update.Should().NotThrow<NullReferenceException>("because it should fail silently.");
        }

        [Fact]
        public void WithSuccess()
        {
            var gitHubService = new GitHubServiceBuilder()
                .WithIsGithubPushAllowed(true)
                .BuildMock();
            var dataController = new DataControllerBuilder()
                .WithGitHubService(gitHubService.Object)
                .WithGitHubHeaders()
                .WithRequestBody("test")
                .Build();

            OkResult result = null;
            Func<Task> update = async () => result = (OkResult)(await dataController.Update());
            update.Should().NotThrow<NullReferenceException>("because it should succeed.");
            gitHubService.Verify(
                g => g.IsGithubPushAllowed(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>()),
                Times.Once);
        }
    }
}