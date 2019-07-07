import { shallow } from 'enzyme';
import React from 'react';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { Article, ArticleProps } from './Article';

test('Article component with empty article.', async () => {
    const article = shallow(<Article blogElement={null as unknown as BlogElement} />);
    expect(article).toMatchSnapshot();
});

const blogElement: BlogElement = {
    article: 'bla bla bla',
    articleTitle: 'Title',
    blogDate: DateUtil.defaultDate(),
    updateDate: DateUtil.defaultDate(),
    id: 1
};
const data: ArticleProps[] = [
    { blogElement, ellipsis: true, backLink: true },
    { blogElement, ellipsis: false, backLink: true },
    { blogElement, ellipsis: true, backLink: false },
    { blogElement, ellipsis: false, backLink: false },
    { blogElement, ellipsis: false, backLink: false, editLink: true },
];

test('Article component with article.', async () => {
    data.map(articleProps => {
        const article = shallow((
            <Article
                blogElement={articleProps.blogElement}
                ellipsis={articleProps.ellipsis}
                backLink={articleProps.backLink}
                editLink={articleProps.editLink}
            />));
        expect(article).toMatchSnapshot();
    });
});
