import React from 'react';
import { BlogElement, BlogPage } from '../../services/Models';
import { Article } from '../blog/Article';

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
            return null;
        }

        return articles.map((article, key) => {
            return <Article key={key} blogElement={article}
                backLink={false}
                editLink={true}
                ellipsis={true} />;
        });
    }
}
