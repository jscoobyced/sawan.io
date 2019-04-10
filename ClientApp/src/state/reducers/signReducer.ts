import { ACTION_SIGNIN, SessionState, UpdateSessionNewAction } from "../actions";

const initialState: SessionState = {
    isSignedIn: false,
    username: ''
};

const signInOutReducer = (state = initialState, action: UpdateSessionNewAction): SessionState => {
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
