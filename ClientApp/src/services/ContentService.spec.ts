import { TestUtils } from "../../tests/TestUtils";
import { MockAuthentication } from "../components/auth/MockAuthentication";
import { AuthenticationFactory } from "../utils/AuthenticationFactory";
import { DateUtil } from "../utils/DateUtils";
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
        title: "",
        links: []
    },
    navigationMenuContent: {
        about: 'About',
        applications: 'Applications',
        cryptoCurrency: 'Crypto-Currency',
        healthMonitor: 'Health Monitor',
        home: 'Home',
        websiteName: 'sawan.io',
        information: 'Information',
        resume: 'Resume'
    },
    footerContent: {
        copyright: 'Copyright',
        credits: 'sawan.io',
        year: '2018 - ' + DateUtil.defaultDate().getFullYear()
    }
};

const blogElements: BlogElement[] = [
    {
        articleTitle: 'Article content',
        article: 'Title',
        id: 1,
        blogDate: DateUtil.defaultDate(),
        updateDate: DateUtil.defaultDate()
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
        const data = await contentService.getBlogPage("201901", value);
        expect(data).not.toBeNull();
        expect(data.articles.length).toBe(0);
    });
});

test('ContentService can get empty blog content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch([]);
    const data = await contentService.getBlogPage("201901", 4);
    expect(data).not.toBeNull();
    expect(data.articles.length).toBe(0);
});

test('ContentService can get null blog content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(null);
    const data = await contentService.getBlogPage("201901", 4);
    expect(data).not.toBeNull();
    expect(data.articles.length).toBe(0);
});

test('ContentService can get blog content', async () => {
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(blogElements);
    const data = await contentService.getBlogPage("201901", 4);
    expect(data).not.toBeNull();
    expect(data.articles.length).toBe(1);
    expect(data.articles[0].articleTitle).toBe(blogElements[0].articleTitle);
});

test('ContentService can save blog content', async () => {
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const contentService = new ContentService();
    window.fetch = TestUtils.mockFetch(true);
    const data = await contentService.saveBlogElement(blogElements[0]);
    expect(data).not.toBeNull();
    expect(data).toBeTruthy();
});
