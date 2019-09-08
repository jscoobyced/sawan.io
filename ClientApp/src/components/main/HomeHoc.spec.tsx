import { shallow } from 'enzyme';
import React from 'react';
import { match } from 'react-router-dom';
import { TestUtils } from '../../../tests/TestUtils';
import { IdParam } from '../Models';
import { HomeHoc } from './HomeHoc';

describe('HomeHoc', () => {
    it('should display default component', async () => {
        const matchParam: match<IdParam> = TestUtils.createMatch('201901');
        const homeHoc = shallow(<HomeHoc match={matchParam} />);
        const home = homeHoc.find('Home');
        expect(home).toBeDefined();
    });

    it('should update the page', async () => {
        const matchParam: match<IdParam> = TestUtils.createMatch('201901');
        const homeHoc = shallow(<HomeHoc match={matchParam} />);
        homeHoc.setProps({
            match: TestUtils.createMatch('201902')
        });
        const home = homeHoc.find('Home');
        expect(home).toBeDefined();
    });
});
