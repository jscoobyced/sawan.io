import React from 'react';
import { NavLink } from 'react-router-dom';
import xss from 'xss';
import { HomeContent } from '../../services/Models';

export interface HomeProps {
    homeContent: HomeContent;
}

export class Home extends React.Component<HomeProps> {

    private readonly options = {
        whiteList: {
            a: ['href', 'title', 'target'],
            br: []
        }
    };
    private readonly xssFilter = new xss.FilterXSS(this.options);

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
            <div>
                <span dangerouslySetInnerHTML={{ __html: this.getSafeContent(article) }}></span>
                <NavLink to='/' className='link-article'>Read more...</NavLink>
            </div>
        </article>);
    }

    private getSafeContent(content: string): string {
        const safeContent = this.xssFilter.process(content);
        let safeSummary = safeContent.substring(0, 1000);
        if (safeContent !== safeSummary) {
            safeSummary = safeSummary.substring(0, safeSummary.lastIndexOf(" "));
            safeSummary += '&#8230;';
        }
        return safeSummary;
    }
}
