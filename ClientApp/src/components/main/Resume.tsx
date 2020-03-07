import React from 'react';
import { HtmlUtils } from '../../utils/HtmlUtils';

export const Resume = () => {
  let className = 'resume';
  if (HtmlUtils.queryString().indexOf('full') < 0) {
    className += ' regular';
  }

  return (
    <div className={className}>
      <div>
        <div className="left">
          <span className="name">C&eacute;dric Rochefolle</span>
          <span className="period">Development Manager / Senior Software Engineer</span>
          <span className="regular pt10 j">
            A strong and self-motivated Software Engineer, experienced
                                        with large scale e-commerce as well as small, fine tuned websites.
                                Development Manager with proven track in a large company using Agile efficiently.
          </span>
        </div>
        <div className="right">
          <span className="pt10 txtright">
            <a href="mailto:jssirode@gmail.com">jssirode@gmail.com</a>
            {' '}
            <i className="far fa-envelope" />
          </span>
          <span className="pt10 txtright">
            +66 (0)81 807 3420
            <i className="fas fa-mobile" />
          </span>
          <span className="pt10 txtright">
            <a
              href="https://github.com/jscoobyced"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/jscoobyced
            </a>
            <i className="fab fa-github" />
          </span>
          <span className="pt10 txtright">
            <a
              href="https://www.linkedin.com/in/crochefolle"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.linkedin.com/in/crochefolle
            </a>
            {' '}
            <i className="fab fa-linkedin" />
          </span>
        </div>
      </div>
      <div>
        <div className="left">
          <span className="title">WORK EXPERIENCE</span>
          <span className="subtitle">Back-End Development Manager</span>
          <span className="subtitle">Agoda Services Co., Ltd.</span>
          <span className="period far fa-calendar">&nbsp;Apr 2019 - To date</span>
          <span>Achievements:</span>
          <ul>
            <li>Mentored technical leads in the team to build a fully functional
              customer support
              <br />application for Agoda flight business (void/refund/amend tickets)</li>
            <li>Similar duties as in Front-End Development Manager</li>
          </ul>
          <span className="subtitle">Front-End Development Manager</span>
          <span className="subtitle">Agoda Services Co., Ltd.</span>
          <span className="period far fa-calendar">&nbsp;Jul 2015 - Mar 2019</span>
          <span>Manager duties:</span>
          <ul>
            <li>
              <span className="highlight inline">Managed a team</span>
              {' '}
              of up to
              <span className="highlight inline">&nbsp;13 software engineers</span>
            </li>
            <li>Recruited for Front-End department</li>
            <li>Trained new joiners in on-boarding programs</li>
            <li>
              Collected
              <span className="highlight inline">product/business data</span>
              {' '}
              and utilized it
                                        to make strategic decisions
            </li>
            <li>Collected scrum data to improve velocity</li>
          </ul>
          <span>Tech lead duties:</span>
          <ul>
            <li>
              Improved web-application
              <span className="highlight inline">
                server-side
                                        performance by 75%&nbsp;
              </span>
            </li>
            <li>Contributed to the constant evolution of the website:</li>
            <ul>
              <li>
                Migration to use the back-end
                <span className="highlight inline">micro-services</span>
              </li>
              <li>
                Migration from KnockoutJS to
                <span className="highlight inline">ReactJS</span>
              </li>
            </ul>
            <li>Various contributions to company and Bangkok tech community:</li>
            <ul>
              <li>
                <span className="highlight inline">Presenter of 2 Meetups</span>
                {' '}
                in Bangkok:
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/watch?v=6NM-vMHVqeU&list=PLN6GB29N6NmHgVznqf-AUGUVsy8DLRo0v"
                >
                  TypeScript training
                </a>
                {' '}
                and Full Open-Source&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/watch?v=kvxb6qxWLpM"
                >
                  CI/CD for a netcore+reactjs application
                </a>
              </li>
              <li>Online training material</li>
            </ul>
          </ul>
          <span className="subtitle">Senior Software Engineer - Agoda Services Co., Ltd.</span>
          <span className="period far fa-calendar">&nbsp;Dec 2013 - Jun 2015</span>
          <ul>
            <li>Development of Agoda website, operation support: ASP.NET, JQuery</li>
            <li>Re-wrote a part of the main funnel of the website:</li>
            <ul>
              <li>ASP.NET MVC 5 and WebAPI</li>
              <li>KnockOutJS</li>
            </ul>
            <li>Introduced better software development practices:</li>
            <ul>
              <li>
                Benchmarked
                <span className="highlight inline">Dependency Injection&nbsp;</span>
                libraries and identified best fit
              </li>
              <li>Automated code coverage, with a maintained KPI &gt; 70%</li>
              <li>
                Added static code analysis with
                <span className="highlight inline">&nbsp;SonarQube</span>
              </li>
            </ul>
          </ul>
          <span className="subtitle">Technical Director - Yesijoin Co., Ltd.</span>
          <span className="period inline far fa-calendar">&nbsp;Jul 2011 - Nov 2013</span>
          <ul>
            <li>
              Designed and implemented&nbsp;
              <a
                href="https://www.yesijoin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.yesijoin.com
              </a>
              {' '}
              from scratch using J2EE technology:
            </li>
            <ul>
              <li>web-application architecture, EJB 3.0 and JSF (Primefaces)</li>
              <li>
                <span className="highlight inline">Integration with payment gateways</span>
              </li>
              <li>Email marketing via Amazon Email</li>
              <li>Deployment on AWS instance</li>
              <li>Automated testing with selenium</li>
            </ul>
            <li>Built a 3 developers team</li>
            <li>Created a flash-mob interactive device</li>
            <li>Created a web-crawler to collect condos/apartments for sale/rent information</li>
          </ul>
        </div>
        <div className="right">
          <span className="title">EARLIER CAREER</span>
          <span className="subtitle">Technical Director - Entiera Co., Ltd.</span>
          <span className="period far fa-calendar">&nbsp;Jun 2008 - Mar 2011</span>
          <ul>
            <li>Software architecture and design of a J2EE intranet:</li>
            <ul>
              <li>
                Converted development environment from Windows to Ubuntu
                <span className="highlight inline">&nbsp;increased team velocity by 15%</span>
              </li>
              <li>Customized data visualization tool for Verizon (NY office)</li>
            </ul>
            <li>Performed demos and customized JasperServer Professional</li>
            <li>Recruited software engineers</li>
          </ul>
          <span className="period far fa-calendar">&nbsp;2001 - May 2008</span>
          <span>Various software engineer positions in:</span>
          <ul>
            <li>Property Management Systems in hospitality industry</li>
            <li>Biometric and security industry</li>
            <li>Electronics and Jewelry ERP</li>
            <li>System engineer in telecommunication company</li>
          </ul>
          <span className="title">TECHNICAL SKILLS</span>
          <span className="subtitle">Management</span>
          <span>Team Manager, Educator / Trainer, Scrum / Agile, Team Transformer</span>
          <span className="subtitle">Software Engineering</span>
          <span>
            Application at scale, Design Review / Code Review,
                                    Coding Standard / Static Code Analysis, Web-Security / OWASP
          </span>
          <span className="subtitle">Software Development</span>
          <span>ASP.NET, Netcore, Java (J2SE, J2EE), ReactJS, KnockoutJS, TypeScript, HTML/CSS</span>
          <span className="title">PERSONAL PROJECTS</span>
          <ol>
            <li>
              Develop&nbsp;
              <a href="https://sawan.io">sawan.io</a>
              {' '}
              website as a medium to keep learning
              <br />on software development (
              <span className="highlight inline">ReactJS, netcore 2.2, AppVeyor</span>
              <span className="highlight inline">&nbsp;build, Codecov, SonarQube and docker</span>
              )
            </li>
            <li>Raspberry Pi playground:
              <br /><a href='https://medium.com/@jscdroiddev' target='_blank'>Medium articles</a>
              <br /><a href='https://github.com/jscoobyced/raspi-deadite'>Github C/C++ GPIO and opencv source</a>
            </li>
            <li>
              Various base&nbsp;
              <a
                href="https://hub.docker.com/u/jscdroiddev"
                target="_blank"
                rel="noopener noreferrer"
              >
                docker images
              </a>
              {' '}
              to facilitate build and hosting of web-application
            </li>
          </ol>
          <span className="title">SOFT SKILLS</span>
          <span>
            Public speaking (assistant professor in English for Thai government officials),
                                      KPI definition (&quot;Start with WHY&quot;), 1-on-1 meeting
          </span>
          <span className="title">EDUCATION</span>
          <ul>
            <li>Master in Network Systems at University Henry Poincare, France</li>
            <li>Degree in Electronics at University Du Montet, France</li>
          </ul>
          <span className="title">LANGUAGES</span>
          <ul>
            <li>French (native)</li>
            <li>English</li>
            <li>Thai</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
