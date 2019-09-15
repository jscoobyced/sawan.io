import React from 'react';
import { BlogPage } from '../../services/Models';
import { AuthenticationFactory } from '../../utils/AuthenticationFactory';
import { Article } from '../blog/Article';

export interface HomeProps {
  blogPage: BlogPage;
}

export const Home = (props: HomeProps) => {
  const { blogPage: { articles } } = props;
  const isAdmin = AuthenticationFactory.getAuthentication() && AuthenticationFactory.getAuthentication().isAdmin();

  if (!articles || articles.length === 0) {
    return null;
  }

  const result = articles.map(article => (
    <Article
      key={article.id}
      blogElement={article}
      backLink={false}
      editLink={isAdmin}
      ellipsis
    />
  ));

  return <>{result}</>;
};
