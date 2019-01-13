import { ContentKey } from './ContentKey';
import { IContentService } from './IContentService';
import { BlogElement, BlogPage, Language, MainContent } from './Models';

export class ContentService implements IContentService {

    public getMainContent(language: Language): MainContent {
        const content = this.updateMainContent(language);
        return this.mapMainContent(content, language);
    }

    public getDefaultMainContent(): MainContent {
        const content = this.defaultMainContent(Language.English);
        return this.mapMainContent(content, Language.English);
    }

    public getBlogPage(maxResult: number): BlogPage {
        return this.updateBlogPage(maxResult);
    }

    public getDefaultBlogPage(): BlogPage {
        return this.defaultBlogContent();
    }

    public defaultBlogContent(): BlogPage {
        return {
            articles: []
        };
    }

    protected updateMainContent(language: Language): Array<{ [key: string]: string; }> {
        const content: Array<{ [key: string]: string; }> = [];
        content[language] = {};
        // TODO: Fetch main content from API
        return content;
    }

    protected defaultMainContent(language: Language): Array<{ [key: string]: string; }> {
        const content: Array<{ [key: string]: string; }> = [];
        content[language] = {};
        content[language][ContentKey.WebsiteName] = '';
        content[language][ContentKey.Home] = '';
        content[language][ContentKey.About] = '';
        content[language][ContentKey.Applications] = '';
        content[language][ContentKey.CryptoCurrency] = '';
        content[language][ContentKey.HealthMonitor] = '';
        content[language][ContentKey.FooterCopyright] = '';
        content[language][ContentKey.FooterCredits] = '';
        content[language][ContentKey.FooterYear] = '';
        return content;
    }

    protected updateBlogPage(maxResult: number): BlogPage {
        const articles: BlogElement[] = [];
        // TODO: Fetch blog content from API
        return {
            articles
        };
    }

    private mapMainContent(content: Array<{ [key: string]: string; }>, language: Language): MainContent {
        return {
            navigationMenuContent: {
                about: content[language][ContentKey.About],
                applications: content[language][ContentKey.Applications],
                cryptoCurrency: content[language][ContentKey.CryptoCurrency],
                healthMonitor: content[language][ContentKey.HealthMonitor],
                home: content[language][ContentKey.Home],
                websiteName: content[language][ContentKey.WebsiteName],
            },
            menuContent: {
                links: []
            },
            footerContent: {
                credits: content[language][ContentKey.FooterCredits],
                copyright: content[language][ContentKey.FooterCopyright],
                year: content[language][ContentKey.FooterYear]
            }
        };
    }
}
