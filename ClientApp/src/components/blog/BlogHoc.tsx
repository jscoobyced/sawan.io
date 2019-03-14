import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { IdParam } from '../Models';
import { Article } from './Article';
import { EditableArticle } from './EditableArticle';

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
                blogDate: DateUtil.defaultDate(),
                updateDate: DateUtil.defaultDate(),
                id: '0'
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

    public updateBlog = (article: string, articleTitle: string, id: string): Promise<boolean> => {
        const blogElement: BlogElement = {
            article,
            articleTitle,
            blogDate: this.state.blogElement.blogDate,
            updateDate: new Date(),
            id
        };
        return this.contentService.saveBlogElement(blogElement);
    }

    public render() {
        const edit = this.props.match.params.edit === "edit";
        if (edit) {
            return <EditableArticle
                blogElement={this.state.blogElement}
                update={this.updateBlog} />;
        } else {
            return <Article blogElement={this.state.blogElement}
                backLink={true}
                editLink={true}
                ellipsis={false} />;
        }
    }
}
