import React from 'react';
import { Link, MenuContent } from '../../services/Models';

export interface SideBarProps {
    menuContent?: MenuContent;
}

export class SideBar extends React.Component<SideBarProps> {

    constructor(props: SideBarProps) {
        super(props);
    }

    public render() {
        const links: Link[] = this.props.menuContent ? this.props.menuContent.links : [];
        let linkContent;
        if (links) {
            const contentList = links.map((link, key) => <li key={key}>
                <a href={link.url} target={link.target} title={link.title} >{link.text}</a>
            </li>);
            linkContent = <ul>
                {contentList}
            </ul>;
        }

        return <aside>
            {linkContent}
            <article>
                <h1>About C&eacute;dric</h1>
                <div>
                    I am a passionated software engineer that enjoys web development, web security, 
                    Android development... and a bunch of other stuff.
                    <br />I live in The Land Of Smile (Thailand) and currently work 
                    at <a href='https://www.agoda.com' target='_blank'>Agoda</a> as a Software Development Manager.
                </div>
            </article>
            <ul>
                <li>Source Code hosted in <a href='https://github.com/jscoobyced/sawan.io' target='_blank'>
                    <img src='github.png' title='Source code hosted in GitHub' alt='GitHub' />
                </a>
                </li>
                <li>Website built with <a href='https://ci.appveyor.com/project/jscoobyced/sawan-io' target='_blank'>
                    <img src='appveyor.png' title='Webiste built with AppVeyor' alt='AppVeyor' />
                </a>
                </li>
                <li>Code quality by <a href='https://codecov.io/gh/jscoobyced/sawan.io' target='_blank'>
                    <img src='codecov.png' title='Code quality with CodeCov' alt='CodeCov' />
                </a> and <a href='https://sonarcloud.io/dashboard?id=sawan' target='_blank'>
                        <img src='sonarqube.png' title='Code quality with SonarQube' alt='SonarQube' />
                    </a>
                </li>
            </ul>
        </aside>;
    }
}