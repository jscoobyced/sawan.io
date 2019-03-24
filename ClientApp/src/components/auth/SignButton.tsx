import React from 'react';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';

export interface SignButtonProps {
    isSignedIn: boolean;
    signIn: (isSignedIn: boolean) => void;
}

export interface SignButtonState {
    numberOfAttemtps: number;
}

export class SignButton extends React.Component<SignButtonProps, SignButtonState> {

    public constructor(props: SignButtonProps, state: SignButtonState) {
        super(props, state);
        this.state = {
            numberOfAttemtps: 0
        };
        AuthenticationFactory.getAuthentication().init(this.onSignIn);
    }

    public render() {
        return this.props.isSignedIn
            ? <a href='#' onClick={this.signOut} >Sign-Out</a>
            : <div id='g-signin2' />;
    }

    private readonly onSignIn = () => {
        if (AuthenticationFactory.getAuthentication().isAuthSupported()) {
            this.props.signIn(true);
        }
    }

    private readonly signOut = () => {
        AuthenticationFactory.getAuthentication().signOut().then(() => {
            AuthenticationFactory.getAuthentication().renderButton(this.onSignIn);
        });
        this.props.signIn(false);
    }
}
