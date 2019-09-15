export interface SessionState {
    isSignedIn: boolean;
    username: string;
}

export const ACTION_SIGNIN = 'ACTION_SIGNIN';

export interface UpdateSessionAction {
    type: typeof ACTION_SIGNIN;
    session: SessionState;
}

export const doUpdateSession = (session: SessionState): UpdateSessionAction => ({
  type: ACTION_SIGNIN,
  session,
});
