import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doUpdateSession, SessionState } from '../../state/actions/sessionActions';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';

interface SignButtonProps {
    session: SessionState;
    doUpdateSession: (session: SessionState) => void;
}

export class SignButton extends React.Component<SignButtonProps> {

    private readonly buttonId = 'g-signin2';

    public constructor(props: SignButtonProps) {
        super(props);
        AuthenticationFactory.getAuthentication().init(this.onSignIn, this.buttonId);
    }

    public render() {
        return this.props.session.isSignedIn
            ? (
                <a
                    href='#'
                    onClick={this.onSignOut}
                    title='Sign-Out'
                >{this.props.session.username}
                </a>
            )
            : <div id={this.buttonId} >Sign-In</div>;
    }

    private readonly onSignIn = () => {
        this.updateSession(true);
    }

    private readonly onSignOut = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.updateSession(false);
    }

    private readonly updateSession = (isSignedIn: boolean) => {
        const auth = AuthenticationFactory.getAuthentication();
        if (!auth.isAuthSupported()) {
            return;
        }
        const newSession: SessionState = {
            ...this.props.session,
            isSignedIn,
            username: auth.getAuthenticatedUser().given_name
        };
        this.props.doUpdateSession(newSession);
        if (!isSignedIn) {
            auth.signOut();
        }
    }
}

const mapStateToProps = (session: SessionState) => {
    return { session };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ doUpdateSession }, dispatch);

const signButton = connect(mapStateToProps, mapDispatchToProps)(SignButton);

export default signButton;

