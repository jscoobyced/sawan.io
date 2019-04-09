import { ACTION_SIGNIN, SessionState, UpdateSessionAction } from "../actions";

const initialState: SessionState = {
    isSignedIn: false,
    username: ''
};

const signInOutReducer = (state = initialState, action: UpdateSessionAction): SessionState => {
    console.log('signInOutReducer', action.session);
    switch (action.type) {
        case ACTION_SIGNIN: {
            return {
                ...state,
                isSignedIn: action.session.isSignedIn,
                username: action.session.username
            };
        }
        default:
            return state;
    }
};

export default signInOutReducer;
