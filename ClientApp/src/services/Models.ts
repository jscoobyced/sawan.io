export enum Language {
    English = 0,
    French = 1
}

export interface Link {
    text: string;
    url: string;
    target?: string;
    title?: string;
}

export interface MainContent {
    navigationMenuContent: NavigationMenuContent;
    menuContent: MenuContent;
    footerContent: FooterContent;
}

export interface NavigationMenuContent {
    home: string;
    websiteName: string;
    applications: string;
    cryptoCurrency: string;
    healthMonitor: string;
    about: string;
    information: string;
    resume: string;
}

export interface BlogElement {
    id: number;
    blogDate: Date;
    article: string;
    articleTitle: string;
}

export interface BlogPage {
    articles: BlogElement[];
}

export interface MenuContent {
    links: Link[];
}

export interface FooterContent {
    copyright: string;
    credits: string;
    year: string;
}
