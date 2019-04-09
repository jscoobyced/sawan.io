export interface SessionState {
    isSignedIn: boolean;
    username: string;
}

export const ACTION_SIGNIN = 'ACTION_SIGNIN';

export const updateSession = (session: SessionState): UpdateSessionAction => {
    console.log('updateSession Action', session);
    return {
        type: ACTION_SIGNIN,
        session
    };
};

export interface UpdateSessionAction {
    type: typeof ACTION_SIGNIN;
    session: SessionState;
}
