import React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { HtmlUtils } from '../../utils/HtmlUtils';

export interface ArticleProps {
    blogElement: BlogElement;
    ellipsis?: boolean;
    backLink?: boolean;
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
        const blogDate = DateUtil.dateToString(article.blogDate);
        return <div>
            <article>
                <h1>{this.props.blogElement.articleTitle} - {blogDate}</h1>
                <div>
                    <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    {
                        this.props.ellipsis
                            ? <NavLink to={'/blog/' + article.id} className='link-article'>Read more...</NavLink>
                            : null
                    }
                </div>
            </article>
            {
                this.props.backLink
                    ? <NavLink to='/' className='link-article'>Back</NavLink>
                    : null

            }
        </div>;
    }
}