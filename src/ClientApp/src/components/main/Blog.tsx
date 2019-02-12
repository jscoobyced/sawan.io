import React from 'react';
import { match, NavLink } from 'react-router-dom';
import { IdParam } from '../Models';

export interface BlogProps {
    match: match<IdParam>;
}

export class Blog extends React.Component<BlogProps> {

    public constructor(props: BlogProps) {
        super(props);
    }

    public render() {
        const id = this.props.match.params.id;
        return <div>
            <article>
                <h1>Something</h1>
                <div>
                    <span dangerouslySetInnerHTML={{ __html: id }}></span>
                </div>
            </article>
            <NavLink to='/' className='link-article'>Back</NavLink>
        </div>;
    }
}