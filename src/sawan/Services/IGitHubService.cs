namespace sawan.Services
{
    public interface IGithubService
    {
        bool IsGithubPushAllowed(string payload, string eventName, string signatureWithPrefix);
    }
}