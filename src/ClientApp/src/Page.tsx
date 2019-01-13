import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { Home } from './components/main/Home';
import { Layout } from './components/main/Layout';
import { ContentService } from './services/ContentService';
import { AllContent, BlogPage, Language } from './services/Models';
import { HtmlUtils } from './utils/HtmlUtils';

export interface PageState {
    allContent: AllContent;
    blogPage: BlogPage;
}

export class Page extends React.Component<{}, PageState> {

    private readonly contentService: ContentService;

    public constructor(props: any) {
        super(props);
        this.contentService = new ContentService();
        this.state = {
            allContent: this.contentService.defaultContent(),
            blogPage: this.contentService.defaultBlogContent()
        };
    }

    public componentDidMount() {
        const allContent = this.updateContent(Language.English);
        const blogPage = this.contentService.blogPage(4); 
        this.setState({ allContent, blogPage });
    }

    public render() {
        const routes = <Layout allContent={this.state.allContent} >
            <Route exact path='/' component={() => <Home blogPage={this.state.blogPage} />} />
            <Route path='/candle' component={CandleChartPageHoc} />
            <Route path='/health' component={CandleChartPageHoc} />
        </Layout>;
        return <BrowserRouter children={routes} basename={HtmlUtils.baseUrl()} />;
    }

    private updateContent(language: Language): AllContent {
        return this.contentService.updateContent(language);
    }
}
