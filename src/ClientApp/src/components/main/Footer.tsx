import React from 'react';
import { FooterContent } from '../../services/Models';

const version = process.env.VERSION;
const copyright = 'Copyright';
const credits = 'sawan.io';
const year = 2018;

export interface FooterProps {
    footerContent: FooterContent;
    id: string;
}

export class Footer extends React.Component<FooterProps> {

    public constructor(props: FooterProps) {
        super(props);
    }

    public render() {
        const content = this.props.footerContent;
        return <footer id={this.props.id}>
            &copy; {content.copyright} {content.year} {content.credits} - {version}
            </footer>;
    }
}
