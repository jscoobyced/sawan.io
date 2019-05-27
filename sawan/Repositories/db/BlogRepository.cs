using System.Collections.Generic;
using System.Threading.Tasks;

namespace sawan.Repositories
{
    public class BlogRepository : IDbBlogRepository
    {
        public Task<BlogElement> GetBlogElementAsync(string blogId)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<BlogLink>> GetBlogListAsync(int maxResult)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<BlogElement>> GetBlogPageAsync(int maxResult)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> InsertBlogElementAsync(string blogElement)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> InsertBlogElementAsync(IEnumerable<BlogElement> blogElements)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> UpdateBlogElementAsync(BlogElement blogElement)
        {
            throw new System.NotImplementedException();
        }
    }
}