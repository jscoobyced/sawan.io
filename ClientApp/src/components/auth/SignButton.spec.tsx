import { shallow } from 'enzyme';
import React from 'react';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { MockAuthentication } from './MockAuthentication';
import { SignButton } from './SignButton';

test('SignButton default component is unchanged.', () => {
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const signButton = shallow(<SignButton />);
    expect(signButton).toMatchSnapshot();
});

test('SignButton with authentication ready.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.isReady = jest.fn().mockImplementation(() => {
        return true;
    });
    mockAuthentication.renderButton = jest.fn().mockImplementation();
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const signButton = shallow(<SignButton />);
    expect(signButton).toMatchSnapshot();
    expect(mockAuthentication.renderButton).toBeCalledTimes(1);
});

test('SignButton with authentication not ready.', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.isReady = jest.fn().mockImplementation(() => {
        return false;
    });
    mockAuthentication.renderButton = jest.fn().mockImplementation();
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    window.setTimeout = jest.fn().mockImplementation((f, n) => {
        f();
    });
    const signButton = shallow(<SignButton />);
    expect(signButton).toMatchSnapshot();
    expect(mockAuthentication.isReady).toBeCalledTimes(50);
    expect(mockAuthentication.renderButton).toBeCalledTimes(0);
});
