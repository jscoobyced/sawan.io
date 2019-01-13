import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Home } from './Home';

test('Home component is unchanged.', () => {
    const blogPage = new ContentService().blogPage(4);
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});

test('Home component with no article.', () => {
    const blogPage = new ContentService().defaultBlogContent();
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});
