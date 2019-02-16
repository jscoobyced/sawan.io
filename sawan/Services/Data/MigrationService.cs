using System;
using System.IO;
using System.Linq;
using sawan.Repositories;

namespace sawan.Services
{
    public class MigrationService : IMigrationService
    {
        private readonly IDbRepository dbRepository;

        public MigrationService(IDbRepository dbRepository)
        {
            this.dbRepository = dbRepository;
        }

        public void CheckInitialData()
        {
            if (this.dbRepository == null)
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
            var mainContentResult = this.dbRepository.GetMainContent(Language.English);
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
            this.dbRepository.InsertMainContent("MainContent.json");
        }

        private bool CheckDefaultBlog()
        {
            var blog = this.dbRepository.GetBlogPage(3);
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
            this.dbRepository.InsertBlogElement("Blog.json");
        }
    }
}