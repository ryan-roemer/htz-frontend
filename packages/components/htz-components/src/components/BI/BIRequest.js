import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import { doStat, } from './statutil';
import UserDispenser from '../User/UserDispenser';

const AuthorId = gql`
  fragment AuthorId on AuthorObject {
    contentId
  }
`;

const GET_DOSTAT_DATA = gql`
  query BIRequestData($path: String!) {
    page(path: $path) @client {
      ...PageBreadcrumbs
      slots {
        ... on StandardArticleSlots {
          article {
            ... on ArticleHeader {
              data {
                authors {
                  ... on AuthorObject {
                    ...AuthorId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${breadcrumbs}
  ${AuthorId}
`;

class BIRequest extends Component {
  static propTypes = {
    articleId: PropTypes.string,
  };
  static defaultProps = {
    articleId: null,
  };
  state = { shouldRender: false, };

  componentDidMount() {
    if (!this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldRender !== this.state.shouldRender) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        get shouldRender() {
          return false;
        },
      });
    }
  }

  render() {
    const { articleId, } = this.props;
    if (this.state.shouldRender) {
      return (
        <UserDispenser
          render={({ user, }) => {
            if (articleId) {
              return (
                <Query
                  query={GET_DOSTAT_DATA}
                  variables={{ path: articleId, }}
                  errorPolicy="all"
                >
                  {({ data, loading, error, }) => {
                    if (loading) return null;
                    if (error) return console.error(error);
                    let writerId = null;
                    try {
                      writerId =
                        data.page.slots.article[1].data.authors[0].contentId;
                    }
 catch (err) {
                      // do fallback here
                    }

                    doStat(user, data.page.lineage, writerId);
                    return null;
                  }}
                </Query>
              );
            }
            doStat(user);
            return null;
          }}
        />
      );
    }
    return null;
  }
}

export default BIRequest;
