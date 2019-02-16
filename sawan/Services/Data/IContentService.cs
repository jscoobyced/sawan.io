namespace sawan.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IContentService
    {
        Task<MainContent> GetMainContent(Language language);

        Task<IEnumerable<BlogElement>> GetBlogPage(int maxResult);

        Task<BlogElement> GetBlogElement(string blogId);
    }
}