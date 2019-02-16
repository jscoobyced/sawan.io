import { shallow } from 'enzyme';
import React from 'react';
import { BlogElement } from '../../services/Models';
import { Blog } from './Blog';

test('Blog is rendered empty when no blogElement', () => {
    const blog = shallow(<Blog blogElement={null as unknown as BlogElement} />);
    expect(blog).toMatchSnapshot();
});