import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleAuth } from './components/auth/GoogleAuth';
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

AuthenticationFactory.registerAuthentication(new GoogleAuth());
new Index().renderApp();
