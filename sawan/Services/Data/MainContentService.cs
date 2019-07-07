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

        private MainContent ComposeMainContent(MainContent baseMainContent, List<Link> entries)
        {
            var mainContent = baseMainContent.Clone();
            var historyMenus = new List<HistoryMenu>();

            entries.ForEach(entry =>
            {
                var menuName = entry.Created.ToString("MMMM yyyy", CultureInfo.InvariantCulture);
                var current = historyMenus.FirstOrDefault(menu => menu.Name == menuName);
                if (current == null)
                {
                    current = new HistoryMenu()
                    {
                        Name = menuName,
                        Entries = new List<Link>()
                    };
                    historyMenus.Add(current);
                }
                current.Entries.Add(new Link()
                {
                    Created = entry.Created,
                    Text = entry.Text,
                    Title = entry.Text,
                    Url = entry.Url
                });
            });

            mainContent.MenuContent = new MenuContent()
            {
                HistoryMenus = historyMenus
            };
            return mainContent;
        }
    }
}