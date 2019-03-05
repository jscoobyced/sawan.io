import React from 'react';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';

export interface SignButtonState {
    isSignedIn: boolean;
    numberOfAttemtps: number;
}

export class SignButton extends React.Component<{}, SignButtonState> {

    public constructor(props: {}, state: SignButtonState) {
        super(props, state);
        this.state = {
            isSignedIn: false,
            numberOfAttemtps: 0
        };
        AuthenticationFactory.getAuthentication().init(this.onSignIn);
    }

    public render() {
        return this.state.isSignedIn
            ? <a href='#' onClick={this.signOut} >Sign-Out</a>
            : <div id='g-signin2'></div>;
    }

    private readonly onSignIn = () => {
        if (AuthenticationFactory.getAuthentication().isAuthSupported()) {
            this.setState({
                isSignedIn: true
            });
        }
    }

    private readonly signOut = () => {
        AuthenticationFactory.getAuthentication().signOut().then(() => {
            this.setState({
                isSignedIn: false
            });
            AuthenticationFactory.getAuthentication().renderButton(this.onSignIn);
        });
    }
}
