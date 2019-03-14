import React from 'react';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { Article } from './Article';

export interface EditableArticleProps {
    blogElement: BlogElement;
    update: (article: string, articleTitle: string, id: string) => Promise<boolean>;
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
    public constructor(props: EditableArticleProps, state: EditableArticleState) {
        super(props, state);
        this.state = {
            blogElement: {
                article: '',
                articleTitle: '',
                id: '',
                blogDate: DateUtil.defaultDate(),
                updateDate: DateUtil.defaultDate()
            },
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
        const { article, articleTitle } = this.state.blogElement;
        return <div>
            <article className='blog-article'>
                <input type='text' id='article-title'
                    value={articleTitle}
                    onChange={this.onChangeArticleTitle} />
                <textarea rows={24} id='article-text'
                    value={article}
                    onChange={this.onChangeArticle}></textarea>
                <button className='btn-article' id='article-save'
                    onClick={this.update}
                    disabled={this.state.saveDisabled}>{this.state.saveText}</button>
            </article>
            <Article blogElement={this.state.blogElement}
                backLink={true}
                ellipsis={false} />
        </div>;
    }

    private readonly onChangeArticle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const blogElement = this.state.blogElement;
        blogElement.article = event.target.value;
        this.setState({
            blogElement,
            saveText: this.SAVE,
            saveDisabled: false
        });
        event.preventDefault();
    }

    private readonly onChangeArticleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const blogElement = this.state.blogElement;
        blogElement.articleTitle = event.target.value;
        this.setState({
            blogElement,
            saveText: this.SAVE,
            saveDisabled: false
        });
        event.preventDefault();
    }

    private readonly update = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            saveText: this.SAVING,
            saveDisabled: true
        });
        const { article, articleTitle, id } = this.state.blogElement;
        this.props.update(article, articleTitle, id)
            .then(success => {
                this.setState({
                    saveText: success ? this.SAVED : this.FAILED
                });
            });
        event.preventDefault();
    }
}
