import { shallow } from 'enzyme';
import React from 'react';
import { match } from 'react-router-dom';
import { IdParam } from '../Models';
import { BlogHoc } from './BlogHoc';

test('Blog is rendered empty when no blogElement', () => {
    const matchParam: match<IdParam> = {
        isExact: true,
        params: {
            id: '0'
        },
        path: '/',
        url: ''
    };
    const blog = shallow(<BlogHoc match={matchParam} />);
    expect(blog).toMatchSnapshot();
});