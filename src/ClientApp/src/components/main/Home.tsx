import React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogElement, BlogPage } from '../../services/Models';
import { HtmlUtils } from '../../utils/HtmlUtils';

export interface HomeProps {
    blogPage: BlogPage;
}

export class Home extends React.Component<HomeProps> {

    public constructor(props: HomeProps) {
        super(props);
    }

    public render() {
        const articles: BlogElement[] = this.props.blogPage.articles;
        if (!articles || articles.length === 0) {
            return <span></span>;
        }

        return articles.map((article, key) => {
            const content = HtmlUtils.getEllipsis(HtmlUtils.getSafeContent(article.article), 1000);
            return (
                <article key={key}>
                    <h1>{article.articleTitle}</h1>
                    <div>
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                        <NavLink to='/' className='link-article'>Read more...</NavLink>
                    </div>
                </article>);
        });
    }
}
