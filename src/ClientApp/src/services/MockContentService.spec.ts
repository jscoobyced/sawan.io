import { MockContentService } from "./MockContentService";
import { Language } from "./Models";

test('MockContentService can get default content', () => {
    const contentService = new MockContentService();
    expect(contentService.getDefaultMainContent()).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent).not.toBeNull();
    expect(contentService.getDefaultMainContent().menuContent.links).toEqual([]);
});

test('MockContentService can get english content', () => {
    const contentService = new MockContentService();
    const englishContent = contentService.getMainContent(Language.English);
    expect(englishContent).not.toBeNull();
    expect(englishContent.navigationMenuContent.about).toBe('About');
});
