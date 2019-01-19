import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { Home } from './components/main/Home';
import { Layout } from './components/main/Layout';
import { ContentServiceFactory } from './services/ContentServiceFactory';
import { IContentService } from './services/IContentService';
import { BlogPage, Language, MainContent } from './services/Models';
import { HtmlUtils } from './utils/HtmlUtils';

export interface PageState {
    allContent: MainContent;
    blogPage: BlogPage;
}

export class Page extends React.Component<{}, PageState> {

    private readonly contentService: IContentService;

    public constructor(props: any) {
        super(props);
        const mode = process.env.mode as string;
        this.contentService = ContentServiceFactory.GetContentService(mode);
        this.state = {
            allContent: this.contentService.getDefaultMainContent(),
            blogPage: this.contentService.getDefaultBlogPage()
        };
    }

    public componentDidMount() {
        this.contentService.getMainContent(Language.English)
            .then(allContent => {
                this.contentService.getBlogPage(0, 4)
                    .then(blogPage => {
                        this.setState({ allContent, blogPage });
                    });
            });
    }

    public render() {
        const routes = <Layout allContent={this.state.allContent} >
            <Route exact path='/' component={() => <Home blogPage={this.state.blogPage} />} />
            <Route path='/candle' component={CandleChartPageHoc} />
            <Route path='/health' component={CandleChartPageHoc} />
        </Layout>;
        return <BrowserRouter children={routes} basename={HtmlUtils.baseUrl()} />;
    }
}
