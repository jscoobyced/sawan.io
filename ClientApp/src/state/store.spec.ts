import { SessionState } from './actions/sessionActions';
import { getStore } from './store';

test('Can create the store', () => {
  const store = getStore();
  expect(store).not.toBeNull();
  expect(store.getState()).not.toBeNull();
  expect(store.getState().isSignedIn).toBeFalsy();
});

test('Can create the store with initial value', () => {
  const username = 'john';
  const initialState: SessionState = {
    isSignedIn: true,
    username,
  };
  const store = getStore(initialState);
  expect(store).not.toBeNull();
  expect(store.getState()).not.toBeNull();
  expect(store.getState().isSignedIn).toBeTruthy();
  expect(store.getState().username).toBe(username);
});
