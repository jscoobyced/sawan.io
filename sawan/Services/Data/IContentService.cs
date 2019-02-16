namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IContentService
    {
        Task<MainContent> GetMainContentAsync(Language language);

        Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult);

        Task<BlogElement> GetBlogElementAsync(string blogId);
    }
}