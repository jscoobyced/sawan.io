import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogElement } from '../../services/Models';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
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
                blogDate: DateUtil.defaultDate(true),
                updateDate: DateUtil.defaultDate(true),
                id: 0
            }
        };
    }

    public componentDidUpdate(prevProps: BlogHocProps) {
        const articleId = +this.props.match.params.id;
        const prevArticleId = +prevProps.match.params.id;
        if (articleId !== prevArticleId) {
            this.doUpdate(articleId);
        }
    }

    public componentDidMount() {
        this.doUpdate(+this.props.match.params.id);
    }

    public updateBlog = (article: string, articleTitle: string, articleBlogDate: Date, id: number): Promise<boolean> => {
        const blogElement: BlogElement = {
            article,
            articleTitle,
            blogDate: articleBlogDate,
            updateDate: DateUtil.defaultDate(true),
            id
        };
        return this.contentService.saveBlogElement(blogElement);
    }

    public render() {
        const edit = this.props.match.params.edit === "edit";
        const isAdmin = AuthenticationFactory.getAuthentication() && AuthenticationFactory.getAuthentication().isAdmin();

        if (isAdmin && edit) {
            return (
                <EditableArticle
                    blogElement={this.state.blogElement}
                    update={this.updateBlog}
                />);
        } else {
            return (
                <Article
                    blogElement={this.state.blogElement}
                    backLink={true}
                    editLink={isAdmin}
                    ellipsis={false}
                />);
        }
    }

    private doUpdate(articleId: number) {
        if (articleId === 0) {
            return;
        }

        this.contentService.getBlogElement(articleId)
            .then(blogElement => {
                if (blogElement) {
                    this.setState({ blogElement });
                }
            });
    }
}
