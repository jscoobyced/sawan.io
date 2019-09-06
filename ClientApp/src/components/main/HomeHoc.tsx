import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogPage } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { IdParam } from '../Models';
import { Home } from './Home';

export interface HomeHocProps {
    match: match<IdParam>;
}

export interface HomeState {
    blogPage: BlogPage;
}

export class HomeHoc extends React.Component<HomeHocProps, HomeState> {
    private readonly contentService: IContentService;
    private readonly numberOfElements = 40;

    public constructor(props: HomeHocProps) {
        super(props);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            blogPage: this.contentService.getDefaultBlogPage()
        };
    }

    public componentDidMount() {
        const yearMonth = this.props.match.params.id || DateUtil.dateToYyyyMmString(new Date());
        this.contentService.getBlogPage(yearMonth, this.numberOfElements)
            .then(blogPage => {
                const articles = blogPage.articles.slice(0, this.numberOfElements);
                this.setState({
                    blogPage: {
                        articles
                    }
                });
            });
    }

    public render() {
        return <Home blogPage={this.state.blogPage} />;
    }
}
