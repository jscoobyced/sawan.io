import { ContentKey } from './ContentKey';
import { AllContent, Language } from './Models';

export class ContentService {

    private readonly content: Array<{ [key: string]: string | string[]; }> = [];

    public updateContent(language: Language): AllContent {
        this.content[language] = {};
        this.content[language][ContentKey.WebsiteName] = 'sawan.io';
        this.content[language][ContentKey.Home] = 'Home';
        this.content[language][ContentKey.About] = 'About';
        this.content[language][ContentKey.Applications] = 'Applications';
        this.content[language][ContentKey.CryptoCurrency] = 'Cryptocurrency';
        this.content[language][ContentKey.HealthMonitor] = 'Health Monitor';
        const date = '2018-11-15';
        const displayDate = (new Date(date).toISOString().substring(0, 10));
        this.content[language][ContentKey.MainArticleTitle] = [`Latest news - ${displayDate}`,
            'Lorem Ipsum', 'Some other news'];
        this.content[language][ContentKey.MainArticle] = ['Grand opening of sawan.io.<br />This website is about my'
            + ' personal training on various web-technologies: TypeScript, webpack, ReactJS, Secure HTTP headers...'
            + ' It includes a simple (and a bit naive) crypto-currency analyser: it can suggest you to sell'
            + ' or buy. Use at your own risk, it is amateur predictions, you have been warned.'
            + '<br />There will be also an application to track health metrics (weight, % body fat, vascular'
            + ' fat ratio...). Or maybe not, this might be my next project.<br /> This project is open-sourced on <a'
            + ' target=\'_blank\' href=\'https://github.com/jscoobyced/sawan.io\'>Github</a>. Enjoy and have fun.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
        + ' et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        + ' aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'
        + ' cillum dolore eu fugiat nulla pariatur.<br />Excepteur sint occaecat cupidatat non proident, sunt in'
        + ' culpa qui officia deserunt mollit anim id est laborum. Commodo quis imperdiet massa tincidunt.'
        + ' Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit'
        + ' euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus'
        + ' vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi'
        + ' porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque'
        + ' fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Nisi vitae suscipit tellus'
        + ' mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio'
        + ' facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.'
        + ' Turpis nunc eget lorem dolor.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
        + ' et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut'
        + ' aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'
        + ' cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in'
        + ' culpa qui officia deserunt mollit anim id est laborum. Commodo quis imperdiet massa tincidunt.'
        + ' Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit'
        + ' euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus'
        + ' vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi'
        + ' porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque'
        + ' fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Nisi vitae suscipit tellus'
        + ' mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio'
        + ' facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.'
        + ' Turpis nunc eget lorem dolor. Duis aute irure dolor in reprehenderit in voluptate velit esse'
        + ' cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in'
        + ' culpa qui officia deserunt mollit anim id est laborum. Commodo quis imperdiet massa tincidunt.'
        + ' Non enim praesent elementum facilisis leo. Adipiscing diam donec adipiscing tristique. Velit'
        + ' euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus'
        + ' vestibulum lorem sed risus ultricies tristique nulla.<br />Egestas erat imperdiet sed euismod nisi'
        + ' porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque'
        + ' fermentum. Morbi tristique senectus et netus et malesuada fames. Nisi vitae suscipit tellus'
        + ' mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet.'];
        this.content[language][ContentKey.FooterCopyright] = 'Copyright';
        this.content[language][ContentKey.FooterCredits] = 'sawan.io';
        this.content[language][ContentKey.FooterYear] = '2018';

        return this.updateAllContent(language);
    }

    public defaultContent(): AllContent {
        return {
            navigationMenuContent: {
                about: '',
                applications: '',
                cryptoCurrency: '',
                healthMonitor: '',
                home: '',
                websiteName: '',
            },
            homeContent: {
                article: [''],
                articleTitle: ['']
            },
            menuContent: {
                links: [{
                    text: '',
                    url: '',
                    target: '',
                    title: ''
                }]
            },
            footerContent: {
                credits: '',
                copyright: '',
                year: ''
            }
        };

    }

    private updateAllContent(language: Language): AllContent {
        return {
            navigationMenuContent: {
                about: this.content[language][ContentKey.About],
                applications: this.content[language][ContentKey.Applications],
                cryptoCurrency: this.content[language][ContentKey.CryptoCurrency],
                healthMonitor: this.content[language][ContentKey.HealthMonitor],
                home: this.content[language][ContentKey.Home],
                websiteName: this.content[language][ContentKey.WebsiteName],
            },
            homeContent: {
                article: this.content[language][ContentKey.MainArticle],
                articleTitle: this.content[language][ContentKey.MainArticleTitle]
            },
            menuContent: {
                links: [{
                    text: this.content[language][ContentKey.MainArticleTitle][0],
                    url: '#'
                }, {
                    text: this.content[language][ContentKey.MainArticleTitle][1],
                    url: '#'
                }, {
                    text: this.content[language][ContentKey.MainArticleTitle][2],
                    url: '#'
                }]
            },
            footerContent: {
                credits: this.content[language][ContentKey.FooterCredits],
                copyright: this.content[language][ContentKey.FooterCopyright],
                year: this.content[language][ContentKey.FooterYear]
            }
        };
    }
}
