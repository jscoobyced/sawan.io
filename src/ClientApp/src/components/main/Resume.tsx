import React from 'react';
import { HtmlUtils } from '../../utils/HtmlUtils';

export interface ResumeState {
    print?: boolean;
}

export class Resume extends React.Component<{}, ResumeState> {

    public constructor(props: {}, state: ResumeState) {
        super(props, state);
        this.state = {
            print: true
        };
    }

    public render() {
        return this.component();
    }

    public componentDidMount() {
        if (HtmlUtils.queryString().indexOf('full') > 0 && this.state.print) {
            this.setState({
                print: false
            });
            setTimeout(() => {
                window.print();
            }, 500);
        }
    }

    private component() {
        let className = 'resume';
        if (HtmlUtils.queryString().indexOf('full') < 0) {
            className += ' regular';
        }
        return <div className={className}>
            <div>
                <div className='left'>
                    <span className='name'>C&eacute;dric Rochefolle</span>
                    <span className='grey'>Development Manager / Senior Software Engineer</span>
                    <span className='regular pt10 j'>A strong and self-motivated Software Engineer, experienced
                        with large scale e-commerce as well as small, fine tuned websites.
                    Development Manager with proven track in a large company using Agile efficiently.</span>
                </div>
                <div className='right'>
                    <span className='pt10 txtright'>
                        <a
                            href='mailto:jssirode@gmail.com'
                        >jssirode@gmail.com</a> <i className='far fa-envelope'></i></span>
                    <span className='pt10 txtright'>+66 (0)81 807 3420 <i className='fas fa-mobile'></i></span>
                    <span className='pt10 txtright'>Bangkok, Thailand <i className='fas fa-pin'></i></span>
                    <span className='pt10 txtright'>
                        <a
                            href='https://github.com/jscoobyced'
                            target='_blank'>https://github.com/jscoobyced</a><i className="fab fa-github"></i></span>
                    <span className='pt10 txtright'>
                        <a
                            href='https://www.linkedin.com/in/cedricrochefolle'
                            target='_blank'
                        >https://www.linkedin.com/in/cedricrochefolle</a> <i className='fab fa-linkedin'></i>
                    </span>
                </div>
            </div>
            <div>
                <div className='left'>
                    <span className='title'>WORK EXPERIENCE</span>
                    <span className='subtitle'>Development Manager - Agoda Services Co., Ltd.&nbsp;
                        <span className='grey period inline far fa-calendar'>&nbsp;2014 - To date</span>
                    </span>
                    <span>Promoted Development Manager. Relevant duties performed:</span>
                    <ul>
                        <li>Complete the project I started as developer with my team. After completion
                            the <span className='highlight inline'>web-application was 75% faster&nbsp;</span>
                            on server-side performance</li>
                        <li>Was given another team for cross-functional features</li>
                        <li><span className='highlight inline'>Managed a team</span> of up to
                        <span className='highlight inline'>&nbsp;13 software engineers</span></li>
                        <li>Recruiting, on-boarding program for new joiners</li>
                        <li>Contributed to the constant evolution of the website:</li>
                        <ul>
                            <li>Migration to use the back-end <span className='highlight inline'>micro-services</span></li>
                            <li>Collecting product/business data and utilize it to make strategic decisions</li>
                            <li>Migration from KnockoutJS to <span className='highlight inline'>ReactJS</span></li>
                        </ul>
                        <li>Collected team/scrum data and utilize it to transform a team relying on their manager
                            to a self-organizing team (work currently in progress as of February 2019)</li>
                        <li>Various contributions to company and Bangkok tech community:</li>
                        <ul>
                            <li><span className='highlight inline'>Presenter of 2 Meetups</span> in Bangkok: <a
                                target='_blank'
                                href='https://www.youtube.com/watch?v=6NM-vMHVqeU&list=PLN6GB29N6NmHgVznqf-AUGUVsy8DLRo0v'
                            >TypeScript training</a> and Full Open-Source <a
                                target='_blank'
                                href='https://www.youtube.com/watch?v=kvxb6qxWLpM'>CI/CD for a
                                netcore+reactjs application</a></li>
                            <li>Online training material (available within company learning system)</li>
                        </ul>
                    </ul>
                    <span className='subtitle'>Senior Software Engineer - Agoda Services Co., Ltd.&nbsp;
                    <span className='grey period inline far fa-calendar'>&nbsp;2013 - 2014</span>
                    </span>
                    <ul>
                        <li>Development of Agoda website, operation support: ASP.NET, JQuery</li>
                        <li>Re-write a part of the main funnel of the website:</li>
                        <ul>
                            <li>ASP.NET MVC 5 and WebAPI</li>
                            <li>KnockOutJS (we needed support for legacy browsers)</li>
                            <li>Introduced better <span className='highlight inline'>Dependency Injection</span> via
                            <span className='highlight inline'>SimpleInjector</span> (legacy was MS Unity)</li>
                            <li>Introduced automated code coverage (with maintained KPI of > 70%) and static code analysis with
                                <span className='highlight inline'>&nbsp;SonarQube</span></li>
                        </ul>
                    </ul>
                    <span className='subtitle'>Technical Director - Yesijoin Co., Ltd.&nbsp;
                    <span className='grey period inline far fa-calendar'>&nbsp;2011 - 2013</span>
                    </span>
                    <ul>
                        <li>Designed and implemented <a
                            href='https://www.yesijoin.com'
                            target='_blank'>www.yesijoin.com</a> from scratch using J2EE technology:</li>
                        <ul>
                            <li>web-application architecture, EJB 3.0 and JSF (Primefaces)</li>
                            <li>MySQL database</li>
                            <li><span
                                className='highlight inline'>Integration with payment gateways</span>
                                (123 service, 2c2p, Paysbuy, KBank)</li>
                            <li>Email marketing via Amazon Email</li>
                            <li>Deployment on AWS instance</li>
                            <li>Automated testing with selenium</li>
                        </ul>
                        <li>Built a 3 developers team to bring more features to the website and implement
                            2 other websites (only one went live: <a
                                target='_blank'
                                href='https://allthaicoupons.com'>allthaicoupons.com</a> )</li>
                        <li>Introduced Sonarqube and coding practice</li>
                        <li>Created the electronics to support a live advertising system for a flash-mob event:
                            a big box with a screen, a push button and an embedded printer was placed in a
                            public area, we monitored with an IP camera and remote control to print free
                            vouchers to people pressing the button until a count-down reached 0</li>
                        <li>Created a web-crawler to collect condos/apartments for sale/rent information</li>
                    </ul>
                </div>
                <div className='right'>
                    <span className='title'>TECHNICAL SKILLS</span>
                    <span className='subtitle'>Software Engineering</span>
                    <span>Application at scale, Design Review / Code Review,
                        Coding Standard / Static Code Analysis, Web-Security / OWASP</span>
                    <span className='subtitle'>Software Development</span>
                    <span>ASP.NET, Netcore, Java (J2SE, J2EE), ReactJS, KnockoutJS, TypeScript, HTML/CSS</span>
                    <span className='subtitle'>Team Management</span>
                    <span>Team Manager, Educator / Trainer, Scrum / Agile, Team Transformer</span>
                    <span className='title'>PERSONAL PROJECTS</span>
                    <ol>
                        <li>Develop <a href='https://sawan.io'>sawan.io</a> website as a medium to keep learning
                        on software development (
                            <span className='highlight inline'>ReactJS, netcore 2.2, AppVeyor build, Codecov, SonarQube</span>
                            <span className='highlight inline'>&nbsp;and docker</span>)</li>
                        <li>Home CCTV connected to Raspberry Pi 3 and SSH tunnel to VPS for remote monitoring</li>
                        <li>Various base <a href='https://hub.docker.com/u/jscdroiddev'
                            target='_blank'>docker images</a> to facilitate build and hosting of web-application</li>
                    </ol>
                    <span className='title'>SOFT SKILLS</span>
                    <span>Public speaking (assistant professor in English for Thai government officials),
                         KPI definition ("Start with WHY"), 1-on-1 meeting</span>
                    <span className='title'>EDUCATION</span>
                    <ul>
                        <li>Master in Network Systems at University Henry Poincare, France</li>
                        <li>Degree in Electronics at University Du Montet, France</li>
                    </ul>
                    <span className='title'>LANGUAGES</span>
                    <ul>
                        <li>French (native)</li>
                        <li>English</li>
                        <li>Thai</li>
                    </ul>
                    <span className='title'>WORK EXPERIENCE - Continued</span>
                    <span className='subtitle'>Technical Director - Entiera Co., Ltd.&nbsp;
                    <span className='grey period inline far fa-calendar'>&nbsp;2008 - 2011</span>
                    </span>
                    <ul>
                        <li>Software architecture and design of a J2EE intranet:</li>
                        <ul>
                            <li>Convert development environment from Windows to Ubuntu
                                <span className='highlight inline'>&nbsp;(increased team velocity by 15%)</span></li>
                            <li>Customize data visualization tool for Verizon (NY office)</li>
                        </ul>
                        <li>Perform demos and customize JasperServer Professional</li>
                        <li>Assist the Management and Executive team from the US headquarter in managing the Bangkok office</li>
                        <li>Recruiting</li>
                    </ul>
                    <span className='subtitle'>And before that...&nbsp;
                    <span className='grey period inline far fa-calendar'>&nbsp;2001 - 2008</span>
                    </span>
                    <span>Various software engineer positions in:</span>
                    <ul>
                        <li>Property Management Systems in hospitality industry</li>
                        <li>Biometric and security industry</li>
                        <li>Electronics and Jewelry ERP</li>
                        <li>System engineer in telecommunication company</li>
                    </ul>
                </div>
            </div>
        </div >;
    }
}
