import { combineReducers } from 'redux';
import sign from './signReducer';

const rootReducer = combineReducers({
  sign,
});

export default rootReducer;
