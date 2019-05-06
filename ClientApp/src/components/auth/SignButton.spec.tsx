import { shallow } from 'enzyme';
import React from 'react';
import { SessionState } from '../../state/actions/sessionActions';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { MockAuthentication } from './MockAuthentication';
import * as ReduxSignButton from './SignButton';
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

test('SignButton component is unchanged when signed-in.', () => {
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const signedInSesssion = { ...session, isSignedIn: true };
    const signButton = shallow(<SignButton session={signedInSesssion} doUpdateSession={jest.fn().mockImplementation()} />);
    expect(signButton).toMatchSnapshot();
    signButton
        .find('a')
        .simulate('click', { preventDefault: () => { return; } });
});

test('SignButton component is unchanged when signed-in but auth not supported.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.init = jest.fn().mockImplementation();
    mockAuthentication.isAuthSupported = jest.fn().mockImplementation(() => false);
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const signedInSesssion = { ...session, isSignedIn: true };
    const signButton = shallow(<SignButton session={signedInSesssion} doUpdateSession={jest.fn().mockImplementation()} />);
    expect(signButton).toMatchSnapshot();
    signButton
        .find('a')
        .simulate('click', { preventDefault: () => { return; } });
});

test('SignButton with authentication ready.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.init = jest.fn().mockImplementation();
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const signButton = shallow(<SignButton session={session} doUpdateSession={jest.fn().mockImplementation()} />);
    expect(signButton).toMatchSnapshot();
    expect(mockAuthentication.init).toBeCalledTimes(1);
});
