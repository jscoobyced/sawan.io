import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Layout } from './Layout';

describe('Layout', () => {
  test('Layout base component is unchanged.', () => {
    const layout = shallow(<Layout>{[]}</Layout>);
    expect(layout.find('main')).toHaveLength(1);
  });

  test('Layout component with content is unchanged.', () => {
    const allContent = new ContentService().getDefaultMainContent();
    const layout = shallow(<Layout allContent={allContent}>{[]}</Layout>);
    expect(layout.find('main')).toHaveLength(1);
  });
});
