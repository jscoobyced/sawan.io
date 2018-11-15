import { ContentKey } from './ContentKey';
import { AllContent, Language } from './Models';

export class ContentService {

    private readonly content: Array<{ [key: string]: string; }> = [];

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
        this.content[language][ContentKey.MainArticleTitle] = `Latest news - ${displayDate}`;
        this.content[language][ContentKey.MainArticle] = 'Grand opening of sawan.io.<br />This website is about my'
            + ' personal training on various web-technologies: TypeScript, webpack, ReactJS, Secure HTTP headers...'
            + ' It includes a simple (and a bit naive :) ) crypto-currency analyser: it can suggest you to sell'
            + ' or buy. Use at your own risk, it is amateur predictions, you have been warned :)'
            + '<br />There will be also an application to track health metrics (weight, % body fat, vascualar'
            + ' fat ratio... Or not, this will be my next project :)<br /> This project is open-sourced on <a'
            + ' href=\'https://github.com/jscoobyced/sawan.io\'>Github</a>. Enjoy and have fun.';

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
                article: '',
                articleTitle: ''
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
            }
        };
    }
}
