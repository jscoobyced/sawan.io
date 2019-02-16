namespace sawan.Services
{
    public interface IGitHubService
    {
        bool IsGithubPushAllowed(string payload, string eventName, string signatureWithPrefix);
    }
}