import { ACTION_SIGNIN, SessionState, UpdateSessionAction } from '../actions/sessionActions';
import signInOutReducer from './signReducer';

const username = 'john';
const oldSession: SessionState = {
  isSignedIn: false,
  username: '',
};

test('signInOutReducer returns the new state with ACTION_SIGNIN', () => {
  const newSession: SessionState = {
    isSignedIn: true,
    username,
  };
  const action: UpdateSessionAction = {
    type: ACTION_SIGNIN,
    session: newSession,
  };

  const state = signInOutReducer(oldSession, action);
  expect(state).not.toBeNull();
  expect(state.isSignedIn).toBeTruthy();
  expect(state.username).toBe(username);
});

test('signInOutReducer returns the new state even when no initial state', () => {
  const newSession: SessionState = {
    isSignedIn: true,
    username,
  };
  const action: UpdateSessionAction = {
    type: ACTION_SIGNIN,
    session: newSession,
  };

  const state = signInOutReducer(undefined, action);
  expect(state).not.toBeNull();
  expect(state.isSignedIn).toBeTruthy();
  expect(state.username).toBe(username);
});
