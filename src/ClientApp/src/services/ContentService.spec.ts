import { ContentService } from "./ContentService";
import { Language } from "./Models";

test('ContentService can get default content', () => {
    const contentService = new ContentService();
    expect(contentService.getDefaultMainContent()).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent.links).toEqual([]);
});

test('ContentService can get english content', () => {
    const contentService = new ContentService();
    const englishContent = contentService.getMainContent(Language.English);
    expect(englishContent).not.toBeNull();
    // TODO: mock 'fetch' when API is created
    expect(englishContent.navigationMenuContent.about).toBeUndefined();
});

test('ContentService can get blog content', () => {
    const contentService = new ContentService();
    const blogPage = contentService.getBlogPage(4);
    expect(blogPage).not.toBeNull();
    // TODO: mock 'fetch' when API is created
    expect(blogPage.articles).toEqual([]);
});
