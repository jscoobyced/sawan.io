import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { BlogEditHoc } from './components/blog/BlogEditHoc';
import { BlogHoc } from './components/blog/BlogHoc';
import { CandleChartPageHoc } from './components/charts/CandleChartPageHoc';
import { About } from './components/main/About';
import { HomeHoc } from './components/main/HomeHoc';
import { Layout } from './components/main/Layout';
import { Resume } from './components/main/Resume';
import { ContentServiceFactory } from './services/ContentServiceFactory';
import { IContentService } from './services/IContentService';
import { Language, MainContent } from './services/Models';
import { HtmlUtils } from './utils/HtmlUtils';

export interface PageState {
    allContent: MainContent;
}

export class Page extends React.Component<{}, PageState> {

    private readonly contentService: IContentService;

    public constructor(props: {}) {
        super(props);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            allContent: this.contentService.getDefaultMainContent()
        };
    }

    public componentDidMount() {
        this.contentService.getMainContent(Language.English)
            .then(allContent => {
                this.setState({ allContent });
            });
    }

    public render() {
        return (
            <BrowserRouter
                children={this.routes()}
                basename={HtmlUtils.baseUrl()}
            />
        );
    }

    private routes() {
        if (HtmlUtils.queryString().indexOf('full') > 0) {
            // hard-coded resume. Will need something more dynamic
            return <Resume />;
        }
        return (
            <Layout
                allContent={this.state.allContent}
            >
                <Route exact={true} path='/' component={HomeHoc} />
                <Route path='/candle' component={CandleChartPageHoc} />
                <Route path='/health' component={About} />
                <Route path='/blog/view/:id' component={BlogHoc} />
                <Route path='/blog/edit/:id' component={BlogEditHoc} />
                <Route path='/about' component={About} />
                <Route path='/resume' component={Resume} />
            </Layout>);
    }
}
