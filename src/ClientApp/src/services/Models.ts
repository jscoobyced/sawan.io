export enum Language {
    English,
    French
}

export interface AllContent {
    navigationMenuContent: NavigationMenuContent;
    homeContent: HomeContent;
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
