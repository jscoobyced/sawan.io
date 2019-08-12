namespace sawan.Services
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using sawan.Repositories;

    public class MainContentService : IMainContentService
    {
        private readonly IDbMainContentRepository dbMainContentRepository;

        public MainContentService(IDbMainContentRepository dbMainContentRepository)
        {
            this.dbMainContentRepository = dbMainContentRepository;
        }

        public async Task<MainContent> GetMainContentAsync(Language language)
        {
            if (!Enum.IsDefined(typeof(Language), language))
            {
                language = Language.English;
            }

            var baseMainContent = await this.dbMainContentRepository.GetBaseMainContent(language);
            var entries = await this.dbMainContentRepository.GetHistory();

            var mainContent = this.ComposeMainContent(baseMainContent, entries);

            return mainContent;
        }

        private MainContent ComposeMainContent(MainContent baseMainContent, List<DateTime> entries)
        {
            var mainContent = baseMainContent.Clone();
            var links = new HashSet<Link>();

            entries.ForEach(entry =>
            {
                var link = new Link()
                {
                    Text = entry.ToString("MMMM yyyy", CultureInfo.InvariantCulture),
                    Url = $"{entry.Year}{entry.Month.ToString("00")}"
                };
                links.Add(link);
            });

            mainContent.MenuContent = new MenuContent()
            {
                Title = "History",
                Links = links.OrderByDescending(_ => _.Url).ToList()
            };
            return mainContent;
        }
    }
}