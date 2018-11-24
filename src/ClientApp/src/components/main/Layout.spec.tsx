import { shallow } from 'enzyme';
import React from 'react';
import { Layout } from './Layout';

test('Layout component is unchanged.', () => {
    const layout = shallow(<Layout />);
    expect(layout).toMatchSnapshot();
});