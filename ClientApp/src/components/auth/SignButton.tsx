import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SessionState, doUpdateSession } from '../../state/actions/sessionActions';
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
    const { session, doUpdateSession: propsDoUpdateSession } = this.props;
    const newSession: SessionState = {
      ...session,
      isSignedIn,
      username: auth.getAuthenticatedUser().given_name,
    };
    propsDoUpdateSession(newSession);
    if (!isSignedIn) {
      auth.signOut();
    }
  }

  public render() {
    const {
      session: {
        isSignedIn,
        username,
      },
    } = this.props;
    return isSignedIn
      ? (
        <a
          href="#"
          onClick={this.onSignOut}
          title="Sign-Out"
        >
          {username}
        </a>
      )
      : <div id={this.buttonId}>Sign-In</div>;
  }
}

const mapStateToProps = (session: SessionState) => ({ session });

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ doUpdateSession }, dispatch);

const signButton = connect(mapStateToProps, mapDispatchToProps)(SignButton);

export default signButton;
