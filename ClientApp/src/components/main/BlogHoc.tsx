import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogElement } from '../../services/Models';
import { IdParam } from '../Models';
import { Blog } from './Blog';

export interface BlogHocProps {
    match: match<IdParam>;
}

export interface BlogState {
    blogElement: BlogElement;
}

export class BlogHoc extends React.Component<BlogHocProps, BlogState> {
    private readonly contentService: IContentService;

    public constructor(props: BlogHocProps, state: BlogState) {
        super(props, state);
        this.contentService = ContentServiceFactory.GetContentService();
        this.state = {
            blogElement: {
                article: '',
                articleTitle: '',
                blogDate: new Date("2019-01-01T00:00:00+07:00"),
                id: 0
            }
        };
    }

    public componentDidMount() {
        this.contentService.getBlogElement(this.props.match.params.id)
            .then(blogElement => {
                if (blogElement) {
                    this.setState({ blogElement });
                }
            });
    }

    public render() {
        return <Blog blogElement={this.state.blogElement} />;
    }
}
