import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../styles/images/wings.png';
import { HeaderProps } from './Models';

export class Header extends React.Component<HeaderProps> {

    public constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        return <header>
            <img src={logo} className='logo'
                alt={this.props.navigationMenuContent.websiteName + ' logo'}
                title={this.props.navigationMenuContent.websiteName as string} />
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
                        <NavLink to={'/'}>
                            {this.props.navigationMenuContent.about}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>;
    }
}
