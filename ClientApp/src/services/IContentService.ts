import { BlogElement, BlogPage, Language, MainContent } from './Models';

export interface IContentService {
    getMainContent(language: Language): Promise<MainContent>;
    getDefaultMainContent(): MainContent;
    getBlogPage(maxResult: number): Promise<BlogPage>;
    getDefaultBlogPage(): BlogPage;
    getBlogElement(id: string): Promise<BlogElement>;
    saveBlogElement(blogElement: BlogElement): Promise<boolean>;
}
