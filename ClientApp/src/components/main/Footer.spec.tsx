import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Footer } from './Footer';

test('Footer component is unchanged.', () => {
  const { footerContent } = new ContentService().getDefaultMainContent();

  const footer = shallow(<Footer footerContent={footerContent} />);

  expect(footer).toMatchSnapshot();
});
