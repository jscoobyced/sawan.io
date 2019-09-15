import React from 'react';
import { BlogHoc } from './BlogHoc';
import { EditableArticle } from './EditableArticle';


export class BlogEditHoc extends BlogHoc {
  public render() {
    return (
      <EditableArticle
        blogElement={this.state.blogElement}
        update={this.updateBlog}
      />
    );
  }
}
