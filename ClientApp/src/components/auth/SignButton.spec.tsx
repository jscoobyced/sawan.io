import { shallow } from 'enzyme';
import React from 'react';
import { SessionState } from '../../state/actions';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { MockAuthentication } from './MockAuthentication';
import { SignButton } from './SignButton';

const session: SessionState = {
    isSignedIn: false,
    username: ''
};

test('SignButton default component is unchanged.', () => {
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const signButton = shallow(<SignButton session={session} doUpdateSession={jest.fn().mockImplementation()} />);
    expect(signButton).toMatchSnapshot();
});

test('SignButton with authentication ready.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.init = jest.fn().mockImplementation();
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const signButton = shallow(<SignButton session={session} doUpdateSession={jest.fn().mockImplementation()} />);
    expect(signButton).toMatchSnapshot();
    expect(mockAuthentication.init).toBeCalledTimes(1);
});
