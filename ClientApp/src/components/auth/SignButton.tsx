import React from 'react';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';

export interface SignButtonState {
    isSignedIn: boolean;
    numberOfAttemtps: number;
}

export class SignButton extends React.Component<{}, SignButtonState> {

    private readonly maxNumberOfAttempts = 50;

    public constructor(props: {}, state: SignButtonState) {
        super(props, state);
        this.state = {
            isSignedIn: false,
            numberOfAttemtps: 0
        };
        AuthenticationFactory.getAuthentication().init();
    }

    public componentDidMount() {
        this.waitForAuthentication();
    }

    public render() {
        return this.state.isSignedIn
            ? <a href='#' onClick={this.signOut} >Sign-Out</a>
            : <div id='g-signin2'></div>;
    }

    private readonly onSignIn = (googleUser: gapi.auth2.GoogleUser) => {
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

    private readonly waitForAuthentication = () => {
        const numberOfAttemtps = this.state.numberOfAttemtps + 1;
        if (numberOfAttemtps > this.maxNumberOfAttempts) {
            console.log("Attempted ", numberOfAttemtps - 1, "times to get authentication system ready and failed.");
            return;
        }
        this.setState({
            numberOfAttemtps
        });
        if (!AuthenticationFactory.getAuthentication().isReady()) {
            setTimeout(() => {
                this.waitForAuthentication();
            }, 100);
        } else {
            AuthenticationFactory.getAuthentication().renderButton(this.onSignIn);
        }
    }
}
