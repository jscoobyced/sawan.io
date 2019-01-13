import { BlogPage, Language, MainContent } from './Models';

export interface IContentService {
    getMainContent(language: Language): MainContent;
    getDefaultMainContent(): MainContent;
    getBlogPage(maxResult: number): Promise<BlogPage>;
    getDefaultBlogPage(): BlogPage;
}