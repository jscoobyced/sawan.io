import { BlogPage, Language, MainContent } from './Models';

export interface IContentService {
    getMainContent(language: Language): Promise<MainContent>;
    getDefaultMainContent(): MainContent;
    getBlogPage(maxResult: number, from: number): Promise<BlogPage>;
    getDefaultBlogPage(): BlogPage;
}
