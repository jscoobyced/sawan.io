import { shallow } from 'enzyme';
import React from 'react';
import { Resume } from './Resume';

test('Resume component is unchanged.', () => {
  const resume = shallow(<Resume />);

  expect(resume).toMatchSnapshot();
});
