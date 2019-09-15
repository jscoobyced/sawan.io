import React from 'react';
import { match } from 'react-router-dom';
import { ContentServiceFactory } from '../../services/ContentServiceFactory';
import { IContentService } from '../../services/IContentService';
import { BlogPage } from '../../services/Models';
import { DateUtil } from '../../utils/DateUtils';
import { IdParam } from '../Models';
import { Home } from './Home';

export interface HomeHocProps {
  match: match<IdParam>;
}

export interface HomeState {
  blogPage: BlogPage;
}

export class HomeHoc extends React.Component<HomeHocProps, HomeState> {
  private readonly contentService: IContentService;

  private readonly numberOfElements = 10;

  public constructor(props: HomeHocProps) {
    super(props);
    this.contentService = ContentServiceFactory.GetContentService();
    this.state = {
      blogPage: this.contentService.getDefaultBlogPage(),
    };
  }

  public componentDidMount() {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;
    const yearMonth = id || DateUtil.dateToYyyyMmString(new Date());
    this.doUpdate(yearMonth);
  }

  public componentDidUpdate(prevProps: HomeHocProps) {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;
    const {
      match: {
        params: {
          id: prevId,
        },
      },
    } = prevProps;
    const yearMonth = +id;
    const previousYearMonth = +prevId;
    if (!Number.isNaN(yearMonth)
      && !Number.isNaN(previousYearMonth)
      && yearMonth !== previousYearMonth) {
      this.doUpdate(`${yearMonth}`);
    }
  }

  private doUpdate(yearMonth: string) {
    this.contentService.getBlogPage(yearMonth, this.numberOfElements)
      .then((blogPage) => {
        const articles = blogPage.articles.slice(0, this.numberOfElements);
        this.setState({
          blogPage: {
            articles,
          },
        });
      });
  }

  public render() {
    const { blogPage } = this.state;
    return <Home data-test="home" blogPage={blogPage} />;
  }
}
