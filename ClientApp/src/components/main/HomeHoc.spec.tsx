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
    expect(homeHoc).toHaveLength(1);
  });

  it('should display default component if no id parameter', async () => {
    const matchParam: match<IdParam> = TestUtils.createMatch('');
    const homeHoc = shallow(<HomeHoc match={matchParam} />);
    expect(homeHoc).toHaveLength(1);
  });

  it('should update the page', async () => {
    const matchParam: match<IdParam> = TestUtils.createMatch('201901');
    const homeHoc = shallow(<HomeHoc match={matchParam} />);
    homeHoc.setProps({
      match: TestUtils.createMatch('201902'),
    });
    expect(homeHoc).toHaveLength(1);
  });

  it('should not update the page if yearMonth is not a number', async () => {
    const matchParam: match<IdParam> = TestUtils.createMatch('a');
    const homeHoc = shallow(<HomeHoc match={matchParam} />);
    expect(homeHoc).toHaveLength(1);
  });

  it('should update the page if new yearMonth is not a number', async () => {
    const matchParam: match<IdParam> = TestUtils.createMatch('201901');
    const homeHoc = shallow(<HomeHoc match={matchParam} />);
    homeHoc.setProps({
      match: TestUtils.createMatch('a'),
    });
    expect(homeHoc).toHaveLength(1);
  });
});
