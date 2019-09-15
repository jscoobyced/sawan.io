import React from 'react';
import { BlogElement } from '../../services/Models';
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
      saveDisabled: false,
    };
  }

  public componentDidUpdate(prevProps: EditableArticleProps) {
    const { blogElement } = this.props;
    if (blogElement.article !== prevProps.blogElement.article) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        blogElement,
      });
    }
  }

  private readonly onChangeArticle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const {
      target: {
        value,
      },
    } = event;
    const { blogElement: stateBlogElement } = this.state;
    const blogElement = { ...stateBlogElement, article: value };
    this.setState({
      blogElement,
      saveText: this.SAVE,
      saveDisabled: false,
    });
  }

  private readonly onChangeArticleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {
      target: {
        value,
      },
    } = event;
    const { blogElement: stateBlogElement } = this.state;
    const blogElement = { ...stateBlogElement, articleTitle: value };
    this.setState({
      blogElement,
      saveText: this.SAVE,
      saveDisabled: false,
    });
  }

  private readonly update = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      saveText: this.SAVING,
      saveDisabled: true,
    });
    const {
      blogElement: {
        article, articleTitle, blogDate, id,
      },
    } = this.state;
    const { update: updateArticle } = this.props;
    updateArticle(article, articleTitle, blogDate, id)
      .then((success) => {
        this.setState({
          saveText: success ? this.SAVED : this.FAILED,
        });
      });
  }

  public render() {
    const { blogElement, saveDisabled, saveText } = this.state;
    if (!blogElement) {
      return <></>;
    }

    const { article, articleTitle } = blogElement;
    return (
      <div>
        <article
          className="blog-article"
        >
          <input
            type="text"
            id="article-title"
            value={articleTitle}
            onChange={this.onChangeArticleTitle}
          />
          <textarea
            rows={24}
            id="article-text"
            value={article}
            onChange={this.onChangeArticle}
          />
          <button
            type="button"
            className="btn-article"
            id="article-save"
            onClick={this.update}
            disabled={saveDisabled}
          >
            {saveText}
          </button>
        </article>
        <Article
          blogElement={blogElement}
          backLink
          ellipsis={false}
        />
      </div>
    );
  }
}
