import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignButton } from '../auth/SignButton';
import { HeaderProps } from './Models';

export class Header extends React.Component<HeaderProps> {

    public constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        return <header className='main'>
            <img src='wings.png' className='logo'
                alt={this.props.navigationMenuContent.websiteName + ' logo'}
                title={this.props.navigationMenuContent.websiteName} />
            <span>{this.props.navigationMenuContent.websiteName}</span>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>
                        {this.props.navigationMenuContent.home}
                    </NavLink>
                    </li>
                    <li>
                        <a href='#' className='menu-space'>&nbsp;</a>
                    </li>
                    <li>
                        <a href='#' className='dropdown'>{this.props.navigationMenuContent.applications}</a>
                        <ul>
                            <li>
                                <NavLink to={'/candle'}>
                                    {this.props.navigationMenuContent.cryptoCurrency}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/health'}>
                                    {this.props.navigationMenuContent.healthMonitor}
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href='#' className='dropdown'>{this.props.navigationMenuContent.information}</a>
                        <ul>
                            <li>
                                <NavLink to={'/about'}>
                                    {this.props.navigationMenuContent.about}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/resume'}>
                                    {this.props.navigationMenuContent.resume}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/resume/?full'} target='_blank'>
                                    {this.props.navigationMenuContent.resume} <i className='fas fa-print'></i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/Cedric Rochefolle - Resume 2019.pdf'} target='_blank'>
                                    {this.props.navigationMenuContent.resume} <i className='fas fa-download'></i>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <SignButton signIn={this.props.signIn} isSignedIn={this.props.isSignedIn}/>
                    </li>
                </ul>
            </nav>
        </header>;
    }
}
