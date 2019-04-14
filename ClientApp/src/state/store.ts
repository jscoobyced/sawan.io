import { createStore, Store } from "redux";
import { SessionState } from "./actions/sessionActions";
import rootReducer from "./reducers/signReducer";

const initialStateValue: SessionState = {
    isSignedIn: false,
    username: ''
};

export const getStore = (initialState = initialStateValue): Store<SessionState> => {
    return createStore(rootReducer, initialState);
};

