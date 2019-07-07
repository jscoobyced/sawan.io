import { shallow } from 'enzyme';
import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { BlogElement } from '../../services/Models';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { DateUtil } from '../../utils/DateUtils';
import { MockAuthentication } from '../auth/MockAuthentication';
import { IdParam } from '../Models';
import { BlogHoc } from './BlogHoc';

test('Blog is rendered empty when no blogElement', () => {
    const matchParam: match<IdParam> = createMatch('0');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog.find('Article')).toHaveLength(1);
    expect(blog.find('EditableArticle')).toHaveLength(0);
});

test('Blog is rendered with blogElement', () => {
    const matchParam: match<IdParam> = createMatch('1');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog.find('Article')).toHaveLength(1);
    expect(blog.find('EditableArticle')).toHaveLength(0);
});

test('Blog is rendered writable for admin', () => {
    const matchParam: match<IdParam> = createMatch('1', 'edit');
    AuthenticationFactory.registerAuthentication(new MockAuthentication());
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog.find('Article')).toHaveLength(0);
    expect(blog.find('EditableArticle')).toHaveLength(1);
});

test('Blog is rendered not writable for non-admin', () => {
    const mockAuthentication = new MockAuthentication();
    mockAuthentication.init = jest.fn().mockImplementation();
    mockAuthentication.isAdmin = jest.fn().mockImplementation(() => false);
    AuthenticationFactory.registerAuthentication(mockAuthentication, true);
    const matchParam: match<IdParam> = createMatch('1', 'edit');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog.find('Article')).toHaveLength(1);
    expect(blog.find('EditableArticle')).toHaveLength(0);
});

test('Blog is rendered to new page', () => {
    const matchParam: match<IdParam> = createMatch('1');
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog.find('Article')).toHaveLength(1);
    const newMatchParam = createMatch('2');
    blog.setProps({ ...blog.props, match: newMatchParam });
    expect(blog.find('Article')).toHaveLength(1);
});

test('Blog is updated', async () => {
    const contentService = ContentServiceFactory.GetContentService();
    const articleTitle = (await contentService.getBlogElement(1)).articleTitle;
    expect(articleTitle).toBe('Starting again');
    const matchParam: match<IdParam> = createMatch('1');
    const blog = new BlogHoc({ match: matchParam }, { blogElement: null as unknown as BlogElement });
    blog.updateBlog('test', 'test', DateUtil.defaultDate(), 1);
    const articleTitleAfter = (await contentService.getBlogElement(1)).article;
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