import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { SideBar } from './SideBar';

test('Layout component with content is unchanged.', () => {
    const allContent = new ContentService().defaultContent();
    const sideBar = shallow(<SideBar allContent={allContent} />);
    expect(sideBar).toMatchSnapshot();
});
