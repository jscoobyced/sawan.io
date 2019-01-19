import { TestUtils } from "../../tests/TestUtils";
import { ContentService } from "./ContentService";
import { BlogElement, Language, MainContent } from "./Models";

test('ContentService can get default content', () => {
    const contentService = new ContentService();
    expect(contentService.getDefaultMainContent()).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent.links).toEqual([]);
});

const mainContent: MainContent = {
    menuContent: {
        links: []
    },
    navigationMenuContent: {
        about: 'About',
        applications: 'Applications',
        cryptoCurrency: 'Crypto-Currency',
        healthMonitor: 'Health Monitor',
        home: 'Home',
        websiteName: 'sawan.io'
    },
    footerContent: {
        copyright: 'Copyright',
        credits: 'sawan.io',
        year: '2018 - ' + new Date().getFullYear()
    }
};

const blogElements: BlogElement[] = [
    {
        articleTitle: 'Article content',
        article: 'Title'
    }
];

test('ContentService can get english content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(mainContent);
    const englishContent = await contentService.getMainContent(Language.English);
    expect(englishContent).not.toBeNull();
    expect(englishContent.navigationMenuContent.about)
        .toEqual(mainContent.navigationMenuContent.about);
});

const maxResults = [0, -1];
test('ContentService check maxResult for blog', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(blogElements);
    maxResults.map(async value => {
        const data = await contentService.getBlogPage(0, value);
        expect(data).not.toBeNull();
        expect(data.articles.length).toBe(0);
    });
});

test('ContentService can get empty blog content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch([]);
    const data = await contentService.getBlogPage(0, 4);
    expect(data).not.toBeNull();
    expect(data.articles.length).toBe(0);
});

test('ContentService can get blog content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(blogElements);
    const data = await contentService.getBlogPage(1, 4);
    expect(data).not.toBeNull();
    expect(data.articles.length).toBe(1);
    expect(data.articles[0].articleTitle).toBe(blogElements[0].articleTitle);
});
