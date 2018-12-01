using FluentAssertions;
using sawan.Services;
using Xunit;

namespace sawan.tests
{
    public class GitHubServiceTests
    {
        [Theory]
        [InlineData(null, null, null)]
        [InlineData(null, "null", "null")]
        [InlineData("null", null, "null")]
        [InlineData("null", "null", null)]
        [InlineData("", "", "")]
        [InlineData("", "t", "t")]
        [InlineData("t", "", "t")]
        [InlineData("t", "t", "")]
        [InlineData("t", "release", "not-sha1=")]
        [InlineData("t", "not-release", "sha1=1234567890")]
        [InlineData("payload", "release", "sha1=1234567890")]
        public void IsGithubPushAllowedNone(string payload, string eventName, string signature)
        {
            var options = new OptionBuilder()
                .WithGitHubScript("echo")
                .WithGitHubWebHookToken("none")
                .Build();
            var gitHubService = new GitHubService(options);
            var result = gitHubService.IsGithubPushAllowed(payload, eventName, signature);
            result.Should().BeFalse();
        }

        [Fact]
        public void IsGithubPushAllowed()
        {
            var payload = "{\"action\":\"published\",\"release\":{\"url\":\"https://api.github.com/repos/\","
                + "\"assets_url\":\"https://api.github.com/repos/assets\",\"upload_url\":\"https://api.githu"
                + "b.com/repos/assets{?name,label}\",\"html_url\":\"https://api.github.com/repos/\",\"id\":1"
                + "4294432,\"node_id\":\"MDc6UmVsZWFzZTE0Mjk0NDMy\",\"tag_name\":\"1.0.26\",\"target_commiti"
                + "sh\":\"6adfb34f5a5a8375b6edecef25e6ff4f31e35925\",\"name\":\"sawan.io-v1.0.26\",\"draft\""
                + ":false,\"author\":{},\"prerelease\":false,\"created_at\":\"2018-12-01T07:06:51Z\",\"publi"
                + "shed_at\":\"2018-12-01T07:12:20Z\",\"assets\":{},\"tarball_url\":\"https://api.github.com"
                + "/repos/\",\"zipball_url\":\"https://api.github.com/repos/\",\"body\":\"Somestuff\"},\"rep"
                + "ository\":{},\"sender\":{}}";
            var eventName = "release";
            var signature = "sha1=f492a04199b96f3daaa001b028b52e3da774d258";
            var options = new OptionBuilder()
                .WithGitHubScript("echo")
                .WithGitHubWebHookToken("none")
                .Build();
            var gitHubService = new GitHubService(options);
            var result = gitHubService.IsGithubPushAllowed(payload, eventName, signature);
            result.Should().BeTrue();
        }
    }
}