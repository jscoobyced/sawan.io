import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SessionState, updateSession } from '../../state/actions';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';

export interface SignButtonProps {
    session: SessionState;
}

export class SignButton extends React.Component<SignButtonProps, SessionState> {
    private readonly buttonId = 'g-signin2';

    public constructor(props: SignButtonProps) {
        super(props);
        this.state = {
            isSignedIn: false,
            username: ''
        };
        AuthenticationFactory.getAuthentication().init(() => { 
            return;
        }, this.buttonId);
    }

    public render() {
        return this.props.session.isSignedIn
            ? <a href='#' onClick={this.signOut} >Sign-Out</a>
            : <a href='#' onClick={this.onSignIn} >Sign-In</a>;
        // : <div onClick={this.onSignIn} id={this.buttonId} >Sign-In</div>;
    }

    private onSignIn = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const newSession: SessionState = { ...this.state, isSignedIn: true };
        this.props.dispatch(updateSession(newSession));
    }

    private signOut = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const newSession: SessionState = { ...this.state, isSignedIn: false };
        this.props.dispatch(updateSession(newSession));
        //AuthenticationFactory.getAuthentication().signOut();
    }
}


const mapStateToProps = (session: SessionState) => {
    console.log('mapStateToProps', session);
    return { session };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ updateSession }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignButton);

