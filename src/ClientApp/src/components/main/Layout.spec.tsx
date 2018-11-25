import { shallow } from 'enzyme';
import React from 'react';
import { Layout } from './Layout';
import { ContentService } from '../../services/ContentService';

test('Layout base component is unchanged.', () => {
    const layout = shallow(<Layout />);
    expect(layout).toMatchSnapshot();
});

test('Layout component with content is unchanged.', () => {
    const allContent = new ContentService().defaultContent();
    const layout = shallow(<Layout allContent={allContent} />);
    expect(layout).toMatchSnapshot();
});
