import React from 'react';
import { FooterContent } from '../../services/Models';

const version = process.env.VERSION;

export interface FooterProps {
  footerContent: FooterContent;
}

export const Footer = (props: FooterProps) => {
  const {
    footerContent: {
      copyright,
      year,
      credits,
    },
  } = props;
  return (
    <footer>
      &copy;
      {' '}
      {copyright}
      {' '}
      {year}
      {' '}
      {credits}
      {' '}
      -
      {' '}
      {version}
    </footer>
  );
};
