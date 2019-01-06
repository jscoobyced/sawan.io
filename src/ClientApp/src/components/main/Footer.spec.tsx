import { shallow } from 'enzyme';
import React from 'react';
import { Footer } from './Footer';
import { ContentService } from '../../services/ContentService';

test('Footer component is unchanged.', () => {
    const footerContent = new ContentService().defaultContent().footerContent;

    const footer = shallow(<Footer footerContent={footerContent} />);

    expect(footer).toMatchSnapshot();
});