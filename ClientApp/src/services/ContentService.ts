import { ApiUtils } from '../utils/ApiUtils';
import { IContentService } from './IContentService';
import { BlogElement, BlogPage, Language, MainContent } from './Models';

export class ContentService implements IContentService {

    public async getMainContent(language: Language): Promise<MainContent> {
        return this.fetchMainContent(language);
    }

    public getDefaultMainContent(): MainContent {
        return this.defaultMainContent();
    }

    public async getBlogPage(yearMonth: string, maxResult: number): Promise<BlogPage> {
        return this.updateBlogPage(yearMonth, maxResult);
    }

    public async getBlogElement(id: number): Promise<BlogElement> {
        return ApiUtils.fetchData<BlogElement>(`/api/Data/blog/${id}`);
    }

    public getDefaultBlogPage(): BlogPage {
        return {
            articles: []
        };
    }

    public async saveBlogElement(blogElement: BlogElement): Promise<boolean> {
        return this.doSaveBlogElement(blogElement);
    }

    protected async doSaveBlogElement(blogElement: BlogElement): Promise<boolean> {
        return ApiUtils.postData('/api/Data/blog/post/', blogElement);
    }

    protected async fetchMainContent(language: Language): Promise<MainContent> {
        return ApiUtils.fetchData<MainContent>(`/api/Data/main/${language}`);
    }

    protected defaultMainContent(): MainContent {
        return {
            menuContent: {
                title: '',
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

    protected async updateBlogPage(yearMonth: string, maxResult: number): Promise<BlogPage> {
        const empty = {
            articles: []
        };
        if (maxResult <= 0) {
            return empty;
        }
        const data = await ApiUtils.fetchData<BlogElement[]>(`/api/Data/blogpage/${yearMonth}/${maxResult}`);
        if (!data || data.length === 0) {
            return empty;
        }
        return {
            articles: data.slice(0, Math.min(maxResult, data.length))
        };
    }
}
