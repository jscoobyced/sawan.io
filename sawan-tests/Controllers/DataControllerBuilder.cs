namespace sawan.tests
{
    using System.Linq;
    using System.Collections;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using sawan;
    using sawan.Controllers;
    using sawan.Services;
    using System.IO;
    using System.Text;

    public class DataControllerBuilder
    {
        private IPairingService pairingService;

        private IMainContentService mainContentService;

        private IBlogContentService blogContentService;

        public DataControllerBuilder WithPairingService(IPairingService pairingService)
        {
            this.pairingService = pairingService;
            return this;
        }

        public DataControllerBuilder WithMainContentService(IMainContentService contentService)
        {
            this.mainContentService = contentService;
            return this;
        }

        public DataControllerBuilder WithBlogContentService(IBlogContentService contentService)
        {
            this.blogContentService = contentService;
            return this;
        }

        public DataController Build()
        {
            return new DataController(
                this.pairingService,
                this.mainContentService,
                this.blogContentService);
        }
    }
}