import { shallow } from 'enzyme';
import React from 'react';
import { Page } from './Page';

test('Page content is preserved', () => {
    const page = shallow(<Page />);
    expect(page.find('Layout')).toHaveLength(1);
    expect(page.find('Route')).toHaveLength(8);
});
