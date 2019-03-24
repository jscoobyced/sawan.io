import { shallow } from 'enzyme';
import React from 'react';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { EditableArticle } from './EditableArticle';

test('Render EditableArticle', () => {
    const update = jest.fn().mockImplementation();
    const editableArticle = shallow((
        <EditableArticle
            blogElement={null as unknown as BlogElement}
            update={update}
        />));
    expect(editableArticle).toMatchSnapshot();
});

test('Render EditableArticle', () => {
    const update = jest.fn().mockImplementation();
    const blogElement: BlogElement = {
        article: 'test',
        articleTitle: 'blablabla',
        id: '123',
        blogDate: DateUtil.defaultDate()
    };
    const editableArticle = shallow((
        <EditableArticle
            blogElement={blogElement}
            update={update}
        />));
    expect(editableArticle).toMatchSnapshot();
});

test('Render EditableArticle', () => {
    const update = jest.fn().mockImplementation((): Promise<boolean> => {
        return Promise.resolve(true);
    });
    const blogElement: BlogElement = {
        article: 'test',
        articleTitle: 'blablabla',
        id: '123',
        blogDate: DateUtil.defaultDate()
    };
    const editableArticle = shallow((
        <EditableArticle
            blogElement={blogElement}
            update={update}
        />));
    editableArticle
        .find('#article-title')
        .simulate('change', { target: { value: 'bla-title' }, preventDefault: () => { return; } });
    editableArticle
        .find('#article-text')
        .simulate('change', { target: { value: 'bla-text' }, preventDefault: () => { return; } });
    editableArticle
        .find('#article-save')
        .simulate('click', { preventDefault: () => { return; } });
    expect(editableArticle).toMatchSnapshot();
    expect(update).toHaveBeenCalledTimes(1);
});
