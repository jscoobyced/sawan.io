import { ContentService } from './ContentService';
import { BlogElement, BlogPage, Language, MainContent } from './Models';

export class MockContentService extends ContentService {

    private readonly data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        + ' aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit '
        + ' cillum dolore eu fugiat nulla pariatur.<br />Excepteur sint occaecat cupidatat non proident, '
        + ' culpa qui officia deserunt mollit anim id est laborum. Commodo qui imperdiet massa tincidunt.'
        + ' Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit'
        + ' euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus'
        + ' vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi'
        + ' porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque'
        + ' fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Vitae suscipit tellus'
        + ' mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio'
        + ' facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.'
        + ' Turpis nunc eget lorem dolor.';

    protected updateMainContent(language: Language): Promise<MainContent> {
        const content: MainContent = {
            menuContent: {
                links: []
            },
            navigationMenuContent: {
                about: 'About',
                applications: 'Applications',
                cryptoCurrency: 'Crypto-Currency',
                healthMonitor: 'Health Monitor',
                home: 'Home',
                websiteName: 'sawan.io'
            },
            footerContent: {
                copyright: 'Copyright',
                credits: 'sawan.io',
                year: '2018 - ' + new Date().getFullYear()
            }
        };
        return Promise.resolve(content);
    }

    protected updateBlogPage(maxResult: number): Promise<BlogPage> {
        const date = '2018-11-15';
        const displayDate = (new Date(date).toISOString().substring(0, 10));
        const articles: BlogElement[] = [
            {
                article: `Latest news - ${displayDate}`,
                articleTitle: 'Grand opening of sawan.io.<br />This website is about my'
                    + ' personal training on various web-technologies: TypeScript, webpack, ReactJS, Secure HTTP'
                    + '  headers... It includes a simple (and a bit naive) crypto-currency analyser: it can'
                    + ' suggest you to sell or buy. Use at your own risk, it is amateur predictions, you have'
                    + ' been warned.<br />There will be also an application to track health metrics (weight,'
                    + ' % body fat, vascular fat ratio...). Or maybe not, this might be my next project.<br />'
                    + ' This project is open-sourced on <atarget=\'_blank\''
                    + ' href=\'https://github.com/jscoobyced/sawan.io\'>Github</a>. Enjoy and have fun.'
            },
            {
                article: 'Lorem Ipsum',
                articleTitle: this.data
            },
            {
                article: 'Some other news',
                articleTitle: this.data
            }
        ];
        return Promise.resolve({ articles });
    }
}
