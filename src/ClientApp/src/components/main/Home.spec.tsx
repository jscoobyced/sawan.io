import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Home } from './Home';

test('Home component is unchanged.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});

test('Home component with no article.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    homeContent.article = [];
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});

test('Home component with no title.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    homeContent.articleTitle = [];
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});

test('Home component with different lengths.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    homeContent.articleTitle = [''];
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});

test('Home component with long article.', () => {
    const homeContent = new ContentService().defaultContent().homeContent;
    const longContent = 'x'.repeat(1024);
    homeContent.article = [longContent];
    const home = shallow(<Home homeContent={homeContent} />);

    expect(home).toMatchSnapshot();
});
