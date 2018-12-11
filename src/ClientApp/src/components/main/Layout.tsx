import React from 'react';
import { AllContent } from '../../services/Models';
import { Footer } from './Footer';
import { Header } from './Header';
import { SideBar } from './SideBar';

export interface LayoutProps {
    children?: React.ReactNode;
    allContent?: AllContent;
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
            <Header navigationMenuContent={this.props.allContent.navigationMenuContent} />
            <section>
                {this.props.children}
            </section>
            <SideBar menuContent={this.props.allContent.menuContent} />
            <Footer />
        </main>;
    }
}
