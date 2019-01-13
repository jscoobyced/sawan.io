import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Layout } from './Layout';

test('Layout base component is unchanged.', () => {
    const layout = shallow(<Layout />);
    expect(layout).toMatchSnapshot();
});

test('Layout component with content is unchanged.', () => {
    const allContent = new ContentService().getDefaultMainContent();
    const layout = shallow(<Layout allContent={allContent} />);
    expect(layout).toMatchSnapshot();
});
