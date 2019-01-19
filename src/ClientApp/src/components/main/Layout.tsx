import React from 'react';
import { MainContent } from '../../services/Models';
import { Footer } from './Footer';
import { Header } from './Header';
import { SideBar } from './SideBar';

export interface LayoutProps {
    children?: React.ReactNode;
    allContent?: MainContent;
}

export class Layout extends React.Component<LayoutProps> {

    public constructor(props: LayoutProps) {
        super(props);
    }

    public render() {
        if (this.props.allContent == null) {
            return <div></div>;
        }

        return <main>
            <section>
                <Header navigationMenuContent={this.props.allContent.navigationMenuContent} />
                {this.props.children}
            </section>
            <SideBar allContent={this.props.allContent} />
            <Footer footerContent={this.props.allContent.footerContent} />
        </main>;
    }
}
