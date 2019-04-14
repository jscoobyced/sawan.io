import React from 'react';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogPage } from '../../services/Models';
import { Home } from './Home';

export interface HomeState {
    blogPage: BlogPage;
}

export class HomeHoc extends React.Component<{}, HomeState> {
    private readonly contentService: IContentService;
    private readonly numberOfElements = 3;

    public constructor(props: {}) {
        super(props);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            blogPage: this.contentService.getDefaultBlogPage()
        };
    }

    public componentDidMount() {
        this.contentService.getBlogPage(this.numberOfElements)
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
