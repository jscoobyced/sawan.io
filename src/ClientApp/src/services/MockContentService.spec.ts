import { MockContentService } from "./MockContentService";
import { Language } from "./Models";

test('MockContentService can get default content', () => {
    const contentService = new MockContentService();
    expect(contentService.getDefaultMainContent()).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent.links).toEqual([]);
});

test('MockContentService can get english content', async () => {
    const contentService = new MockContentService();
    const englishContent = await contentService.getMainContent(Language.English);
    expect(englishContent).not.toBeNull();
    expect(englishContent.navigationMenuContent.about).toBe('About');
});

test('MockContentService can get default blogpage', () => {
    const contentService = new MockContentService();
    expect(contentService.getDefaultBlogPage()).not.toBeNull();
    expect(contentService.getDefaultBlogPage().articles).not.toBeNull();
    expect(contentService.getDefaultBlogPage().articles.length).toBe(0);
});

test('MockContentService can get blogpage', async () => {
    const contentService = new MockContentService();
    const blogPage = await contentService.getBlogPage(3, 0);
    expect(blogPage).not.toBeNull();
    expect(blogPage.articles).not.toBeNull();
    expect(blogPage.articles.length).toBeGreaterThan(0);
    expect(blogPage.articles[0].articleTitle).not.toBeNull();
    expect(blogPage.articles[0].article).not.toBeNull();
});
