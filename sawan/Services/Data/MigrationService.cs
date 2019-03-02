using System;
using System.IO;
using System.Linq;
using sawan.Repositories;

namespace sawan.Services
{
    public class MigrationService : IMigrationService
    {
        private readonly IDbMainContentRepository dbMainContentRepository;
        private readonly IDbBlogRepository dbBlogRepository;

        public MigrationService(IDbMainContentRepository dbMainContentRepository, IDbBlogRepository dbBlogRepository)
        {
            this.dbMainContentRepository = dbMainContentRepository;
            this.dbBlogRepository = dbBlogRepository;
        }

        public void CheckInitialData()
        {
            if (this.dbMainContentRepository == null)
            {
                return;
            }

            if (!this.CheckMainContent())
            {
                this.InsertMainContent();
            }

            if (!this.CheckDefaultBlog())
            {
                this.InsertDefaultBlog();
            }
        }

        private bool CheckMainContent()
        {
            var mainContentResult = this.dbMainContentRepository.GetMainContentAsync(Language.English);
            if (mainContentResult != null)
            {
                var mainContent = mainContentResult.Result;
                if (mainContent?.MenuContent?.Links?.Any() == true
                && !string.IsNullOrWhiteSpace(mainContent.MenuContent.Links.First().Text))
                {
                    return true;
                }
            }

            return false;
        }

        private void InsertMainContent()
        {
            this.dbMainContentRepository.InsertMainContentAsync("MainContent.json");
        }

        private bool CheckDefaultBlog()
        {
            var blog = this.dbBlogRepository.GetBlogPageAsync(3);
            if (blog != null)
            {
                var blogResult = blog.Result;
                if (!string.IsNullOrWhiteSpace(blogResult?.FirstOrDefault()?.Article))
                {
                    return true;
                }
            }

            return false;
        }

        private void InsertDefaultBlog()
        {
            this.dbBlogRepository.InsertBlogElementAsync("Blog.json");
        }
    }
}