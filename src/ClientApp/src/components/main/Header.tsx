import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Constants } from '../Models';
import { HeaderProps } from './Models';

export class Header extends React.Component<HeaderProps> {

    public constructor(props: HeaderProps) {
        super(props);
    }

    public render() {
        const logoSrc = `${Constants.ImagePath}wings.svg`;
        return <header>
            <img src={logoSrc} className='logo'
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
                        <NavLink to={'/'}>
                            {this.props.navigationMenuContent.about}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>;
    }
}
