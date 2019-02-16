import { ApiUtils } from '../utils/ApiUtils';
import { IContentService } from './IContentService';
import { BlogElement, BlogPage, Language, MainContent } from './Models';

export class ContentService implements IContentService {

    public async getMainContent(language: Language): Promise<MainContent> {
        return this.updateMainContent(language);
    }

    public getDefaultMainContent(): MainContent {
        return this.defaultMainContent();
    }

    public async getBlogPage(maxResult: number): Promise<BlogPage> {
        return this.updateBlogPage(maxResult);
    }

    public async getBlogElement(id: number): Promise<BlogElement> {
        return ApiUtils.fetchData<BlogElement>(`/api/Data/blog/${id}`);
    }

    public getDefaultBlogPage(): BlogPage {
        return {
            articles: []
        };
    }

    protected async updateMainContent(language: Language): Promise<MainContent> {
        return ApiUtils.fetchData<MainContent>(`/api/Data/main/${language}`);
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
                websiteName: '',
                information: '',
                resume: ''
            },
            footerContent: {
                copyright: '',
                credits: '',
                year: ''
            }
        };
    }

    protected async updateBlogPage(maxResult: number): Promise<BlogPage> {
        const empty = {
            articles: []
        };
        if (maxResult <= 0) {
            return empty;
        }
        const data = await ApiUtils.fetchData<BlogElement[]>(`/api/Data/blogpage/${maxResult}`);
        if (!data || data.length === 0) {
            return empty;
        }
        return {
            articles: data.slice(0, Math.min(maxResult, data.length))
        };
    }
}
