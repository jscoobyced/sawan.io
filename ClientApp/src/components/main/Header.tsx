import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationMenuContent } from '../../services/Models';
import { SessionState } from '../../state/actions';
import SignButton from '../auth/SignButton';

export interface HeaderProps {
    navigationMenuContent: NavigationMenuContent;
}

interface HeaderState {
    session: SessionState;
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    public state = {
        session: {
            isSignedIn: false,
            username: ''
        }
    };

    public render() {
        return (
            <header className='main'>
                <img
                    src='wings.png'
                    className='logo'
                    alt={this.props.navigationMenuContent.websiteName + ' logo'}
                    title={this.props.navigationMenuContent.websiteName}
                />
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
                                        {this.props.navigationMenuContent.resume} <i className='fas fa-print' />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/Cedric Rochefolle - Resume 2019.pdf'} target='_blank'>
                                        {this.props.navigationMenuContent.resume} <i className='fas fa-download' />
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <SignButton />
                        </li>
                    </ul>
                </nav>
            </header>);
    }
}
