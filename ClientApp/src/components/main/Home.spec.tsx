import { shallow } from 'enzyme';
import React from 'react';
import { MockContentService } from '../../services/MockContentService';
import { Home } from './Home';

test('Home component is unchanged.', async () => {
    const blogPage = await new MockContentService().getBlogPage(4, 0);
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});

test('Home component with no article.', () => {
    const blogPage = new MockContentService().getDefaultBlogPage();
    const home = shallow(<Home blogPage={blogPage} />);
    expect(home).toMatchSnapshot();
});
