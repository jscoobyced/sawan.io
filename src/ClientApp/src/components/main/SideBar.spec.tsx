import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { SideBar } from './SideBar';

test('SideBar base component is unchanged.', () => {
    const sideBar = shallow(<SideBar />);
    expect(sideBar).toMatchSnapshot();
});

test('Layout component with content is unchanged.', () => {
    const menuContent = new ContentService().defaultContent().menuContent;
    const sideBar = shallow(<SideBar menuContent={menuContent} />);
    expect(sideBar).toMatchSnapshot();
});
