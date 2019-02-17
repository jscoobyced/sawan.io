import React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { HtmlUtils } from '../../utils/HtmlUtils';

export interface ArticleProps {
    blogElement: BlogElement;
    ellipsis?: boolean;
    backLink?: boolean;
    editLink?: boolean;
}

export class Article extends React.Component<ArticleProps> {
    public constructor(props: ArticleProps) {
        super(props);
    }

    public render() {
        const article = this.props.blogElement;
        if (!article) {
            return null;
        }
        let content = HtmlUtils.getSafeContent(article.article);
        if (this.props.ellipsis) {
            content = HtmlUtils.getEllipsis(content, 1000);
        }
        const blogDate = DateUtil.dateToString(!article.blogDate ? DateUtil.defaultDate() : article.blogDate);
        let editLink = null;
        let readMoreLink = null;
        let backLink = null;
        if (this.props.ellipsis) {
            readMoreLink = <NavLink to={'/blog/view/' + article.id} className='link-article'>Read more...</NavLink>;
        }
        if (this.props.backLink) {
            backLink = <NavLink to='/' className='btn-article'>Back</NavLink>;
        }
        if (this.props.editLink) {
            editLink = <NavLink to={'/blog/edit/' + article.id}>Edit</NavLink>;
        }

        return <div>
            <article className='blog-article'>
                <header>
                    <h1>{this.props.blogElement.articleTitle}</h1>
                    <span>{blogDate}</span>
                </header>
                <div className='article-content'>
                    <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    <div className='article-links'>
                        {editLink}
                        {readMoreLink}
                    </div>
                </div>
                {backLink}
            </article>
        </div>;
    }
}
