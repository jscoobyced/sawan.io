import React from 'react';
import { MainContent, MenuContent } from '../../services/Models';
import { Footer } from './Footer';
import { Header } from './Header';
import { SideBar } from './SideBar';

export interface LayoutProps {
  children: React.ReactNode;
  allContent?: MainContent;
}

export const Layout = (props: LayoutProps) => {
  const { allContent, children } = props;
  const safeAllContent: MainContent = allContent !== undefined ? allContent : {} as MainContent;
  const { navigationMenuContent, footerContent } = safeAllContent;
  return (allContent === null) ? <></> : (
    <main>
      <section>
        <Header
          navigationMenuContent={navigationMenuContent}
        />
        {children}
      </section>
      <SideBar allContent={safeAllContent} />
      <Footer footerContent={footerContent} />
    </main>
  );
};
