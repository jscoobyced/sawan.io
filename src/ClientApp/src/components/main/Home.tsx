import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeContent } from '../../services/Models';

export interface HomeProps {
    homeContent: HomeContent;
}

export class Home extends React.Component<HomeProps> {

    public constructor(props: HomeProps) {
        super(props);
    }

    public render() {
        const articles: string[] = this.props.homeContent.article as string[];
        const titles: string[] = this.props.homeContent.articleTitle as string[];
        if (!articles || !titles || articles.length !== titles.length) {
            return <span></span>;
        }

        return articles.map((article, key) => <article key={key}>
            <h1>{titles[key]}</h1>
            <section>
                <span dangerouslySetInnerHTML={{ __html: article }}></span>
                <NavLink to='/' className='link-article'>Read more...</NavLink>
            </section>
        </article>);
    }
}
