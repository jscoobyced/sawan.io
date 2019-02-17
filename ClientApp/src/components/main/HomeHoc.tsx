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

    public constructor(props: {}, state: HomeState) {
        super(props, state);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            blogPage: this.contentService.getDefaultBlogPage()
        };
    }

    public componentDidMount() {
        this.contentService.getBlogPage(4)
            .then(blogPage => {
                this.setState({ blogPage });
            });
    }

    public render() {
        return <Home blogPage={this.state.blogPage} />;
    }
}