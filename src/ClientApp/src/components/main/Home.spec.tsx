import { shallow } from 'enzyme';
import React from 'react';
import { MockContentService } from '../../services/MockContentService';
import { Home } from './Home';

test('Home component is unchanged.', () => {
    const blogPage = new MockContentService().getBlogPage(4);
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});

test('Home component with no article.', () => {
    const blogPage = new MockContentService().defaultBlogContent();
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});
