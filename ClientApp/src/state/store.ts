import { createStore } from "redux";
import rootReducer from "./reducers";


export const getStore = (initialState: any = {}) => {
    return createStore(rootReducer, initialState);
};

