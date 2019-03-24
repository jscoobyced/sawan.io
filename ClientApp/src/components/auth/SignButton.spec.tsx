import { shallow } from 'enzyme';
import React from 'react';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { MockAuthentication } from './MockAuthentication';
import { SignButton } from './SignButton';

test('SignButton default component is unchanged.', () => {
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const signIn = () => jest.fn().mockImplementation();
    const signButton = shallow(<SignButton signIn={signIn} isSignedIn={false}/>);
    expect(signButton).toMatchSnapshot();
});

test('SignButton with authentication ready.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.init = jest.fn().mockImplementation();
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const signIn = () => jest.fn().mockImplementation();
    const signButton = shallow(<SignButton signIn={signIn} isSignedIn={false}/>);
    expect(signButton).toMatchSnapshot();
    expect(mockAuthentication.init).toBeCalledTimes(1);
});
