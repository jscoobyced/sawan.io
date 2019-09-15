import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationMenuContent } from '../../services/Models';
import { SessionState } from '../../state/actions/sessionActions';
import SignButton from '../auth/SignButton';

export interface HeaderProps {
  navigationMenuContent: NavigationMenuContent;
}

interface HeaderState {
  session: SessionState;
}

export const Header = (props: HeaderProps, state: HeaderState) => {
  const [session] = useState({
    isSignedIn: false,
    username: '',
  });

  const {
    navigationMenuContent: {
      websiteName,
      home,
      applications,
      cryptoCurrency,
      healthMonitor,
      information,
      about,
      resume,
    },
  } = props;

  return (
    <header className="main">
      <img
        src="wings.png"
        className="logo"
        alt={`${websiteName} logo`}
        title={websiteName}
      />
      <span>{websiteName}</span>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              {home}
            </NavLink>
          </li>
          <li>
            <a href="#" className="menu-space">&nbsp;</a>
          </li>
          <li>
            <a href="#" className="dropdown">{applications}</a>
            <ul>
              <li>
                <NavLink to="/candle">
                  {cryptoCurrency}
                </NavLink>
              </li>
              <li>
                <NavLink to="/health">
                  {healthMonitor}
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className="dropdown">{information}</a>
            <ul>
              <li>
                <NavLink to="/about">
                  {about}
                </NavLink>
              </li>
              <li>
                <NavLink to="/resume">
                  {resume}
                </NavLink>
              </li>
              <li>
                <NavLink to="/resume/?full" target="_blank">
                  {resume}
                  {' '}
                  <i className="fas fa-print" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cedric Rochefolle - Resume 2019.pdf" target="_blank">
                  {resume}
                  {' '}
                  <i className="fas fa-download" />
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <SignButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
