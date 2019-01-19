import { ApiUtils } from '../utils/ApiUtils';
import { IContentService } from './IContentService';
import { BlogElement, BlogPage, Language, MainContent } from './Models';

export class ContentService implements IContentService {

    public async getMainContent(language: Language): Promise<MainContent> {
        return await this.updateMainContent(language);
    }

    public getDefaultMainContent(): MainContent {
        return this.defaultMainContent();
    }

    public async getBlogPage(from: number, maxResult: number): Promise<BlogPage> {
        return await this.updateBlogPage(from, maxResult);
    }

    public getDefaultBlogPage(): BlogPage {
        return {
            articles: []
        };
    }

    protected async updateMainContent(language: Language): Promise<MainContent> {
        return await ApiUtils.fetchData<MainContent>(`/api/Data/main/${language}`);
    }

    protected defaultMainContent(): MainContent {
        return {
            menuContent: {
                links: []
            },
            navigationMenuContent: {
                about: '',
                applications: '',
                cryptoCurrency: '',
                healthMonitor: '',
                home: '',
                websiteName: ''
            },
            footerContent: {
                copyright: '',
                credits: '',
                year: ''
            }
        };
    }

    protected async updateBlogPage(from: number, maxResult: number): Promise<BlogPage> {
        const empty = {
            articles: []
        };
        if (maxResult <= 0) {
            return empty;
        }
        const data = await ApiUtils.fetchData<BlogElement[]>(`/api/Data/blog/${from}/${maxResult}`);
        if (!data || data.length === 0) {
            return empty;
        }
        return {
            articles: data.slice(0, Math.min(maxResult, data.length))
        };
    }
}
