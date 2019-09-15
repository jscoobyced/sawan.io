import { shallow } from 'enzyme';
import React from 'react';
import { About } from './About';

test('About component is unchanged.', () => {
  const about = shallow(<About />);
  expect(about.find('div')).toHaveLength(1);
});
