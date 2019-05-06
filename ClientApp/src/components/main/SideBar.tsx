import React from 'react';
import { MainContent } from '../../services/Models';
import BlogHistory from './BlogHistory';

export interface SideBarProps {
    allContent: MainContent;
}

export class SideBar extends React.Component<SideBarProps> {

    constructor(props: SideBarProps) {
        super(props);
    }

    public render() {
        return (
            <aside>
                <BlogHistory menu={this.props.allContent.menuContent} />
                <article>
                    <h1>About C&eacute;dric</h1>
                    <div className='article-content'>
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
            </aside>);
    }
}
