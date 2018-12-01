namespace sawan.tests
{
    using System.Collections.Generic;
    using sawan.Services;
    using Moq;

    public class GitHubServiceBuilder
    {
        private bool IsGithubPushAllowed;

        public GitHubServiceBuilder WithIsGithubPushAllowed(bool allowed)
        {
            this.IsGithubPushAllowed = allowed;
            return this;
        }

        public Mock<IGitHubService> BuildMock()
        {
            var mockGitHubService = new Mock<IGitHubService>();
            mockGitHubService
            .Setup(s => s.IsGithubPushAllowed(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(IsGithubPushAllowed);

            return mockGitHubService;
        }

        public IGitHubService Build()
        {
            return this.BuildMock().Object;
        }
    }
}