import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleAuth } from './components/auth/GoogleAuth';
import { MockAuthentication } from './components/auth/MockAuthentication';
import './import';
import { Page } from './Page';
import { AuthenticationFactory } from './utils/AuthenticationFactory';

export class Index {

  public renderApp() {
    ReactDOM.render(
      <Page />,
      document.getElementById('app-root')
    );
  }

}

const mode = process.env.mode as string;
if (mode === 'production') {
  AuthenticationFactory.registerAuthentication(new GoogleAuth());
} else {
  AuthenticationFactory.registerAuthentication(new MockAuthentication());
}
new Index().renderApp();
