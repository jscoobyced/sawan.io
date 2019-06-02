import React from 'react';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { Article } from './Article';

export interface EditableArticleProps {
    blogElement: BlogElement;
    update: (article: string, articleTitle: string, articleBlogDate: Date, id: number) => Promise<boolean>;
}

export interface EditableArticleState {
    blogElement: BlogElement;
    saveText: string;
    saveDisabled: boolean;
}

export class EditableArticle extends React.Component<EditableArticleProps, EditableArticleState> {
    private readonly SAVE = 'Save';
    private readonly SAVING = 'Saving';
    private readonly SAVED = 'Saved';
    private readonly FAILED = 'Failed';
    public constructor(props: EditableArticleProps) {
        super(props);
        this.state = {
            blogElement: props.blogElement,
            saveText: this.SAVE,
            saveDisabled: false
        };
    }

    public componentDidUpdate(prevProps: EditableArticleProps) {
        const blogElement = this.props.blogElement;
        if (blogElement.article !== prevProps.blogElement.article) {
            this.setState({
                blogElement
            });
        }
    }

    public render() {
        if (!this.state.blogElement) {
            return <></>;
        }

        const { article, articleTitle } = this.state.blogElement;
        return (
            <div>
                <article
                    className='blog-article'
                >
                    <input
                        type='text'
                        id='article-title'
                        value={articleTitle}
                        onChange={this.onChangeArticleTitle}
                    />
                    <textarea
                        rows={24}
                        id='article-text'
                        value={article}
                        onChange={this.onChangeArticle}
                    />
                    <button
                        className='btn-article'
                        id='article-save'
                        onClick={this.update}
                        disabled={this.state.saveDisabled}
                    >
                        {this.state.saveText}
                    </button>
                </article>
                <Article
                    blogElement={this.state.blogElement}
                    backLink={true}
                    ellipsis={false}
                />
            </div>);
    }

    private readonly onChangeArticle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const blogElement = { ...this.state.blogElement, article: event.target.value };
        this.setState({
            blogElement,
            saveText: this.SAVE,
            saveDisabled: false
        });
    }

    private readonly onChangeArticleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const blogElement = { ...this.state.blogElement, articleTitle: event.target.value };
        this.setState({
            blogElement,
            saveText: this.SAVE,
            saveDisabled: false
        });
    }

    private readonly update = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.setState({
            saveText: this.SAVING,
            saveDisabled: true
        });
        const { article, articleTitle, blogDate, id } = this.state.blogElement;
        this.props.update(article, articleTitle, blogDate, id)
            .then(success => {
                this.setState({
                    saveText: success ? this.SAVED : this.FAILED
                });
            });
    }
}
