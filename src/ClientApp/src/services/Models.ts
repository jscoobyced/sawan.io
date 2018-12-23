import { Url } from "url";

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

export interface AllContent {
    navigationMenuContent: NavigationMenuContent;
    homeContent: HomeContent;
    menuContent: MenuContent;
    footerContent: FooterContent;
}

export interface NavigationMenuContent {
    home: string | string[];
    websiteName: string | string[];
    applications: string | string[];
    cryptoCurrency: string | string[];
    healthMonitor: string | string[];
    about: string | string[];
}

export interface HomeContent {
    articleTitle: string | string[];
    article: string | string[];
}

export interface MenuContent {
    links: Link[];
}

export interface FooterContent {
    copyright: string | string[];
    credits: string | string[];
    year: string | string[];
}