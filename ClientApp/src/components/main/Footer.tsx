import React from 'react';
import { FooterContent } from '../../services/Models';

const version = process.env.VERSION;

export interface FooterProps {
    footerContent: FooterContent;
}

export class Footer extends React.Component<FooterProps> {

    public constructor(props: FooterProps) {
        super(props);
    }

    public render() {
        const content = this.props.footerContent;
        return <footer>
            &copy; {content.copyright} {content.year} {content.credits} - {version}
            </footer>;
    }
}
