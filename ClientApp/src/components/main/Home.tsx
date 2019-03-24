import React from 'react';
import { BlogElement, BlogPage } from '../../services/Models';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { Article } from '../blog/Article';

export interface HomeProps {
    blogPage: BlogPage;
    isSignedIn: boolean;
}

export interface HomeState {
    isSignedIn: boolean;
}

export class Home extends React.Component<HomeProps, HomeState> {

    public constructor(props: HomeProps, state: HomeState) {
        super(props, state);
        this.state = {
            isSignedIn: false
        };
    }

    public render() {
        const articles: BlogElement[] = this.props.blogPage.articles;
        const isAdmin = AuthenticationFactory.getAuthentication() && AuthenticationFactory.getAuthentication().isAdmin();

        if (!articles || articles.length === 0) {
            return null;
        }

        return articles.map((article, key) => {
            return (
                <Article
                    key={key}
                    blogElement={article}
                    backLink={false}
                    editLink={isAdmin}
                    ellipsis={true}
                />);
        });
    }
}
