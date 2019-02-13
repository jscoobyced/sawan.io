import React from 'react';
import { BlogElement } from '../../services/Models';
import { Article } from './Article';

export interface BlogProps {
    blogElement: BlogElement;
}

export class Blog extends React.Component<BlogProps> {

    public constructor(props: BlogProps) {
        super(props);
    }

    public render() {
        return <Article blogElement={this.props.blogElement}
            backLink={true}
            ellipsis={false} />;
    }
}