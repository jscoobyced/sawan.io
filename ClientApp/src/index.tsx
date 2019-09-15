import 'babel-polyfill';
import './import';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { AuthenticationFactory } from './utils/AuthenticationFactory';
import { getStore } from './state/store';
import { GoogleAuth } from './components/auth/GoogleAuth';
import { MockAuthentication } from './components/auth/MockAuthentication';
import { Page } from './Page';

export class Index {
  private readonly store = getStore();

  public renderApp() {
    ReactDOM.render(
      <Provider store={this.store}>
        <Page />
      </Provider>,
      document.getElementById('app-root'),
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
