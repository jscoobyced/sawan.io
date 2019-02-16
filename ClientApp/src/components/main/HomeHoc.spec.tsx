import { shallow } from 'enzyme';
import React from 'react';
import { HomeHoc } from './HomeHoc';

test('HomeHoc component is unchanged.', async () => {
    const homeHoc = shallow(<HomeHoc />);
    expect(homeHoc).toMatchSnapshot();
});
