import { ACTION_SIGNIN, SessionState, doUpdateSession } from './sessionActions';

test('doUpdateSession can pass the new session', () => {
  const username = 'john';
  const session: SessionState = {
    isSignedIn: true,
    username,
  };
  const sessionAction = doUpdateSession(session);
  expect(sessionAction).not.toBeNull();
  expect(sessionAction.type).toBe(ACTION_SIGNIN);
  expect(sessionAction.session).not.toBeNull();
  expect(sessionAction.session.isSignedIn).toBeTruthy();
  expect(sessionAction.session.username).toBe(username);
});
