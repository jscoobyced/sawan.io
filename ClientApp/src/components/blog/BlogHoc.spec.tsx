import { shallow } from 'enzyme';
import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { BlogElement } from '../../services/Models';
import { IdParam } from '../Models';
import { BlogHoc } from './BlogHoc';

test('Blog is rendered empty when no blogElement', () => {
    const matchParam: match<IdParam> = createMatch('0');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog).toMatchSnapshot();
});

test('Blog is rendered with blogElement', () => {
    const matchParam: match<IdParam> = createMatch('1');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog).toMatchSnapshot();
});

test('Blog is rendered writable', () => {
    const matchParam: match<IdParam> = createMatch('1', 'edit');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog).toMatchSnapshot();
});

test('Blog is updated', async () => {
    const contentService = ContentServiceFactory.GetContentService();
    const articleTitle = (await contentService.getBlogElement('1')).articleTitle;
    expect(articleTitle).toBe('Starting again');
    const matchParam: match<IdParam> = createMatch('1');
    const blog = new BlogHoc({ match: matchParam }, { blogElement: null as unknown as BlogElement });
    blog.updateBlog('test', 'test', '1');
    const articleTitleAfter = (await contentService.getBlogElement('1')).article;
    expect(articleTitleAfter).toBe('test');
});

function createMatch(id: string, edit = '') {
    const matchParam: match<IdParam> = {
        isExact: true,
        params: {
            id,
            edit
        },
        path: '/',
        url: ''
    };

    return matchParam;
}