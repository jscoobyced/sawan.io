import { shallow } from 'enzyme';
import React from 'react';
import { match } from 'react-router-dom';
import { TestUtils } from '../../../tests/TestUtils';
import { IdParam } from '../Models';
import { HomeHoc } from './HomeHoc';

test('HomeHoc component is unchanged.', async () => {
    const matchParam: match<IdParam> = TestUtils.createMatch('201901');
    const homeHoc = shallow(<HomeHoc match={matchParam} />);
    expect(homeHoc).toMatchSnapshot();
});
