import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContent } from '../../services/Models';

export interface BlogHistoryProps {
  menu: MenuContent;
}

const BlogHistory: React.FC<BlogHistoryProps> = (props: BlogHistoryProps) => {
  const { menu: { links, title } } = props;
  const contentList = links.map(link => (
    <li key={link.text}>
      <NavLink to={`/blog/month/${link.url}`}>{link.text}</NavLink>
    </li>
  ));

  return (
    <>
      <h1>{title}</h1>
      <ul>{contentList}</ul>
    </>
  );
};

export default BlogHistory;
