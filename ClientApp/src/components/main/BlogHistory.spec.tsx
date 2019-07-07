import { shallow } from 'enzyme';
import React from 'react';
import { MenuContent } from '../../services/Models';
import BlogHistory from './BlogHistory';

test('BlogHistory component is unchanged.', () => {
    const entries = [
        {
            text: 'One',
            url: '1'
        },
        {
            text: 'Two',
            url: '2'
        },
        {
            text: 'Three',
            url: '3'
        }
    ];

    const menuContent: MenuContent = {
        title: 'History',
        historyMenus: [
            {
                name: 'April',
                entries
            },
            {
                name: 'March',
                entries
            },
            {
                name: 'February',
                entries
            },
            {
                name: 'January',
                entries
            },
            {
                name: 'December',
                entries
            }
        ]
    };

    const blogHistory = shallow(<BlogHistory menu={menuContent} />);

    expect(blogHistory).toMatchSnapshot();
    blogHistory
        .find('[data-test="link-0"]')
        .simulate('click', { preventDefault: () => { return; } });
    blogHistory
        .find('[data-test="link-0"]')
        .simulate('click', { preventDefault: () => { return; } });
    blogHistory
        .find('[data-test="link-ve"]')
        .simulate('click', { preventDefault: () => { return; } });
    blogHistory
        .find('[data-test="link-vl"]')
        .simulate('click', { preventDefault: () => { return; } });
});

test('BlogHistory component is unchanged.', () => {
    const menuContent: MenuContent = {
        title: 'test',
        historyMenus: []
    };
    const blogHistory = shallow(<BlogHistory menu={menuContent} />);
    expect(blogHistory).toMatchSnapshot();
});
