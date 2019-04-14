export interface SessionState {
    isSignedIn: boolean;
    username: string;
}

export interface UpdateSessionAction {
    type: typeof ACTION_SIGNIN;
    session: SessionState;
}

export const ACTION_SIGNIN = 'ACTION_SIGNIN';

export const doUpdateSession = (session: SessionState): UpdateSessionAction => {
    return {
        type: ACTION_SIGNIN,
        session
    };
};
