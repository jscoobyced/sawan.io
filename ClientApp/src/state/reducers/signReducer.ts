import { ACTION_SIGNIN, SessionState, UpdateSessionAction } from "../actions/sessionActions";

const initialState: SessionState = {
    isSignedIn: false,
    username: ''
};

const signInOutReducer = (state = initialState, action: UpdateSessionAction): SessionState => {
    if (action.type === ACTION_SIGNIN) {
        return {
            ...state,
            isSignedIn: action.session.isSignedIn,
            username: action.session.username
        };
    }
    return state;
};

export default signInOutReducer;
