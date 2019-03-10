import React from 'react';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogPage } from '../../services/Models';
import { Home } from './Home';

export interface HomeProps {
    isSignedIn: boolean;
}

export interface HomeState {
    blogPage: BlogPage;
}

export class HomeHoc extends React.Component<HomeProps, HomeState> {
    private readonly contentService: IContentService;

    public constructor(props: HomeProps, state: HomeState) {
        super(props, state);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            blogPage: this.contentService.getDefaultBlogPage()
        };
    }

    public componentDidMount() {
        console.log("Updating...", this.props.isSignedIn);

        this.contentService.getBlogPage(50)
            .then(blogPage => {
                this.setState({ blogPage });
            });
    }

    public render() {
        return <Home blogPage={this.state.blogPage} isSignedIn={this.props.isSignedIn} />;
    }
}
