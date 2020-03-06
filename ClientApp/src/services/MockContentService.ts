import {
  BlogElement, BlogPage, Language, MainContent,
} from './Models';
import { ContentService } from './ContentService';
import { DateUtil } from '../utils/DateUtils';

export class MockContentService extends ContentService {
  private readonly data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'
    + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
    + ' aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit '
    + ' cillum dolore eu fugiat nulla pariatur.<br /><code>Excepteur sint occaecat cupidatat</code> '
    + ' non proident, culpa qui officia deserunt mollit <br /> anim id est laborum. Commodo qui imperdiet '
    + ' <br /><pre class=\'bash\'>massa tincidunt. Non enim praesent elementum facilisis leo. Adipiscing'
    + ' diam donec adipiscing tristique. Velit</pre>'
    + ' euismod in pellentesque massa placerat. Interdum velit euismod in pellentesque. Phasellus'
    + ' vestibulum lorem sed risus ultricies tristique nulla. Egestas erat imperdiet sed euismod nisi'
    + ' porta lorem mollis aliquam. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque'
    + ' fermentum. Morbi tristique senectus et netus et malesuada fames.<br />Vitae suscipit tellus'
    + ' mauris a diam maecenas. Sed risus ultricies tristique nulla aliquet. Sagittis eu volutpat odio'
    + ' facilisis mauris sit amet. Tempor orci eu lobortis elementum nibh tellus molestie nunc non.'
    + ' Turpis nunc eget lorem dolor.';

  private readonly displayDate = DateUtil.defaultDate();

  private readonly articles: BlogElement[] = [
    {
      id: 1,
      blogDate: this.displayDate,
      updateDate: this.displayDate,
      articleTitle: 'Starting again',
      article: 'A new begining this year for me. After 5 years at Agoda it is time for me to move on to'
        + ' new challenges. I am going to do something I haven\'t done for a while: writing a '
        + 'resume that reflects my skills and experience without showing off. Not too much at least '
        + '<i class=\'far fa-smile\'></i>'
        + '<br />So I\'m going to take this opportunity to create it using good CSS3 and HTML5 practices.'
        + ' The first thing I have in mind is to limit the DOM depth. Resumes have simple structures, so'
        + ' we shouldn\'t need a long list of nested DIVs. Second is to chosing a monospaced font so we can'
        + ' keep control of the format when printing. Let\'s throw in some '
        + '<a target=\'_blank\' href=\'https://fontawesome.com/\'>font awesome</a> to have a nice touch on '
        + 'the contact details.<br /> You can see the current version <a href=\'/resume/?full\' target=\'_blank\'>'
        + 'here</a>.',
    },
    {
      id: 2,
      blogDate: this.displayDate,
      updateDate: this.displayDate,
      articleTitle: 'Grand opening of sawan.io',
      article: 'Grand opening of sawan.io.<br />This website is about my'
        + ' personal training on various web-technologies: TypeScript, webpack, ReactJS, Secure HTTP'
        + '  headers... It includes a simple (and a bit naive) crypto-currency analyser: it can'
        + ' suggest you to sell or buy. Use at your own risk, it is amateur predictions, you have'
        + ' been warned.<br />There will be also an application to track health metrics (weight,'
        + ' % body fat, vascular fat ratio...). Or maybe not, this might be my next project.<br />'
        + ' This project is open-sourced on <a target=\'_blank\''
        + ' href=\'https://github.com/jscoobyced/sawan.io\'>Github</a>. Enjoy and have fun.',
    },
    {
      id: 3,
      blogDate: this.displayDate,
      updateDate: this.displayDate,
      articleTitle: 'Some other news',
      article: this.data,
    },
  ];

  public async getBlogElement(id: number): Promise<BlogElement> {
    return this.updateBlogPage('201901', 3).then((blogPage) => {
      let article = null as unknown as BlogElement;
      blogPage.articles.forEach(a => {
        if (a.id === id) {
          article = a;
        }
      });

      return article;
    });
  }

  protected fetchMainContent(language: Language): Promise<MainContent> {
    const entries = [
      {
        text: 'July 2019',
        url: '1',
      },
      {
        text: 'May 2019',
        url: '2',
      },
      {
        text: 'January 2019',
        url: '3',
      },
    ];
    const content: MainContent = {
      menuContent: {
        title: 'History',
        links: entries,
      },
      navigationMenuContent: {
        about: 'About',
        applications: 'Applications',
        cryptoCurrency: 'Crypto-Currency',
        healthMonitor: 'Health Monitor',
        home: 'Home',
        websiteName: 'sawan.io',
        information: 'Information',
        resume: 'Resume',
      },
      footerContent: {
        copyright: 'Copyright',
        credits: 'sawan.io',
        year: `2018 - ${new Date().getFullYear()}`,
      },
    };
    return Promise.resolve(content);
  }

  protected async doSaveBlogElement(blogElement: BlogElement): Promise<boolean> {
    this.articles.forEach(article => {
      if (article.id === blogElement.id) {
        /* eslint-disable */
        // ESLint disable for mock
        article.article = blogElement.article;
        article.articleTitle = blogElement.articleTitle;
        /* eslint-enable */
      }
    });
    return Promise.resolve(true);
  }

  protected updateBlogPage = (yearMonth: string, maxResult: number): Promise<BlogPage> => {
    const blog: BlogPage = {
      articles: this.articles,
    };
    return Promise.resolve(blog);
  }
}
