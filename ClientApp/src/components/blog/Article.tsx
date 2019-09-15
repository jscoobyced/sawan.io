import React from 'react';
import { NavLink } from 'react-router-dom';
import { BlogElement } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { HtmlUtils } from '../../utils/HtmlUtils';

export interface ArticleProps {
  blogElement: BlogElement;
  ellipsis?: boolean;
  backLink?: boolean;
  editLink?: boolean;
}

export const Article = (props: ArticleProps) => {
  const {
    blogElement, ellipsis, backLink: propsBackLink, editLink: propsEditLink,
  } = props;
  const article = { ...blogElement };
  let content = HtmlUtils.getSafeContent(article.article);
  if (ellipsis) {
    content = HtmlUtils.getEllipsis(content, 1000);
  }
  const blogDate = DateUtil.dateToString(article.blogDate);
  let editLink = <></>;
  let readMoreLink = <></>;
  let backLink = <></>;
  if (ellipsis) {
    readMoreLink = <NavLink to={`/blog/view/${article.id}`} className="link-article">Read more...</NavLink>;
  }
  if (propsBackLink) {
    backLink = <NavLink to="/" className="btn-article">Back</NavLink>;
  }
  if (propsEditLink) {
    editLink = <NavLink to={`/blog/edit/${article.id}`}>Edit</NavLink>;
  }

  return (
    <div>
      <article className="blog-article">
        <header>
          <h1>{article.articleTitle}</h1>
          <span>{blogDate}</span>
        </header>
        <div className="article-content">
          <span dangerouslySetInnerHTML={{ __html: content }} />
          <div className="article-links">
            {editLink}
            {readMoreLink}
          </div>
        </div>
        {backLink}
      </article>
    </div>
  );
};
