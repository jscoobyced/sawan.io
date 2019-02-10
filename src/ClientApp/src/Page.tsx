import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { About } from './components/main/About';
import { Home } from './components/main/Home';
import { Layout, LayoutProps } from './components/main/Layout';
import { Resume } from './components/main/Resume';
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

    public constructor(props: {}) {
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
        if (HtmlUtils.queryString().indexOf('full') > 0) {
            // hard-coded resume. Will need something more dynamic
            return <Resume />;
        }
        return <BrowserRouter children={this.routes()} basename={HtmlUtils.baseUrl()} />;
    }

    private routes() {
        return <Layout allContent={this.state.allContent} >
            <Route exact path='/' component={() => <Home blogPage={this.state.blogPage} />} />
            <Route path='/candle' component={CandleChartPageHoc} />
            <Route path='/health' component={CandleChartPageHoc} />
            <Route path='/about' component={About} />
            <Route path='/resume' component={Resume} />
        </Layout>;
    }
}
