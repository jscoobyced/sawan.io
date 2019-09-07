import { shallow } from 'enzyme';
import React from 'react';
import { MenuContent } from '../../services/Models';
import BlogHistory from './BlogHistory';

const entries = [
    {
        text: 'April 2019',
        url: '1'
    },
    {
        text: 'February 2019',
        url: '2'
    },
    {
        text: 'October 2018',
        url: '3'
    }
];

test('BlogHistory component is unchanged.', () => {

    const menuContent: MenuContent = {
        title: 'History',
        links: entries
    };

    const blogHistory = shallow(<BlogHistory menu={menuContent} />);

    expect(blogHistory.find('h1')).toHaveLength(1);
    expect(blogHistory.find('li')).toHaveLength(3);
});
