import { shallow } from 'enzyme';
import React from 'react';
import { ContentService } from '../../services/ContentService';
import { Header } from './Header';

test('Header component is unchanged.', () => {
    const navigationMenuContent = new ContentService().getDefaultMainContent().navigationMenuContent;
    const header = shallow(<Header navigationMenuContent={navigationMenuContent} />);

    expect(header).toMatchSnapshot();
});