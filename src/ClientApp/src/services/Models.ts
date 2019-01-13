export enum Language {
    English,
    French
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
}

export interface BlogElement {
    articleTitle: string;
    article: string;
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
