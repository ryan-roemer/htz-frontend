/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import Query from '../ApolloBoundary/Query';
import Mutation from '../ApolloBoundary/Mutation';
import CommentSection from './CommentsSection';
import GET_ID from './queries/getId';
import FETCH_COMMENTS from './queries/fetchComments';
import SUBMIT_NEW_COMMENT from './mutations/submitNewComment';
import SUBMIT_NEW_VOTE from './mutations/submitNewVote';
import SUBMIT_NOTIFICATION_EMAIL from './mutations/submitNotificationEmail';
import REPORT_ABUSE from './mutations/reportAbuse';

class CommentsWithApollo extends React.Component {
  static propTypes = {
    /** The comment element ID from polopoly */
    contentId: PropTypes.string.isRequired,
    /** The article ID from polopoly */
    articleId: PropTypes.string.isRequired,
  };

  state = {
    newCommentId: undefined,
    newCommentHash: undefined,
    loadedAllComments: false,
  };
  // todo: add optimistic response for voting

  initVote = (commentId, group, lineageString, submitNewVote) => {
    submitNewVote({
      variables: {
        commentId,
        group,
        lineageString,
      },
    })
      .then(({ data, }) => {
        // console.warn(data.addVote.status);
      })
      .catch(mutationError => {
        console.warn('there was an error sending the query', mutationError);
      });
  };

  initNewComment = (commentAuthor, commentText, parentCommentId, submitNewComment) => {
    const articleId = this.props.articleId;
    const commentElementId = this.props.contentId;
    const cookie = typeof document !== 'undefined' && document.cookie;
    submitNewComment({
      variables: {
        commentText,
        commentAuthor,
        articleId,
        commentElementId,
        parentCommentId,
        cookie,
      },
    })
      .then(({ data, }) => {
        this.setState({
          newCommentId: data.addComment.newCommentId,
          newCommentHash: data.addComment.hash,
        });
      })
      .catch(mutationError => {
        console.warn('there was an error sending the query', mutationError);
      });
  };

  initSignUpNotificationEmail(email, submitNotificationEmail) {
    submitNotificationEmail({
      variables: {
        commentId: this.state.newCommentId,
        hash: this.state.newCommentHash,
        userEmail: email,
      },
    });
    this.setState({ newCommentId: undefined, newCommentHash: undefined, });
  }

  initReportAbuse(commentId, captchaKey, reportAbuse) {
    reportAbuse({
      variables: {
        commentId,
        captchaKey,
        commentElementId: this.props.contentId,
      },
    });
  }

  handleLoadAllComments(fetchMore) {
    if (!this.state.loadedAllComments) {
      this.setState({ loadedAllComments: true, });
      fetchMore({
        variables: { path: `${this.props.contentId}?composite=true`, },
        updateQuery: (prevResult, { fetchMoreResult, }) => fetchMoreResult,
      });
    }
  }

  render() {
    const { contentId, } = this.props;
    return (
      <Query
        query={FETCH_COMMENTS}
        variables={{
          path: `${contentId}?composite=true&limited=true`,
          articlePath: `/${this.props.articleId}`,
        }}
      >
        {({ data, loading, error, client, fetchMore, }) => {
          if (loading) {
            return null;
          }
          if (error) {
            console.error(error);
            return null;
          }
          if (!data) return null;
          const { commentsElement, } = data;

          // Create page lineage string to be send it to initVote function
          // to be used in rateComment function in dataSources.js
          const lineageStr = data.page
          && data.page.lineage
          && data.page.lineage
            .slice()
            .reverse()
            .reduce((pathFragment, item) => `${pathFragment}%2F${item.contentId}`, '');

          // check if lineageStr is 'string'
          const lineageString = lineageStr || this.props.articleId;

          return (
            <Mutation mutation={REPORT_ABUSE}>
              {reportAbuse => (
                <Mutation mutation={SUBMIT_NOTIFICATION_EMAIL}>
                  {submitNotificationEmail => (
                    <Mutation mutation={SUBMIT_NEW_VOTE}>
                      {submitNewVote => (
                        <Mutation mutation={SUBMIT_NEW_COMMENT}>
                          {submitNewComment => (
                            <CommentSection
                              initVote={(commentId, group) => {
                                this.initVote(commentId, group, lineageString, submitNewVote);
                              }}
                              reportAbuse={(commentId, captchaKey) => {
                                this.initReportAbuse(commentId, captchaKey, reportAbuse);
                              }}
                              initNewComment={(commentAuthor, commentText, parentCommentId) => {
                                this.initNewComment(
                                  commentAuthor,
                                  commentText,
                                  parentCommentId,
                                  submitNewComment
                                );
                              }}
                              signUpNotification={email => this.initSignUpNotificationEmail(email, submitNotificationEmail)
                              }
                              loadAllComments={() => this.handleLoadAllComments(fetchMore)}
                              comments={commentsElement ? commentsElement.comments : []}
                              commentsPlusRate={
                                commentsElement ? commentsElement.commentsPlusRate : null
                              }
                              commentsMinusRate={
                                commentsElement ? commentsElement.commentsMinusRate : null
                              }
                              totalHits={commentsElement ? commentsElement.totalHits : 0}
                            />
                          )}
                        </Mutation>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

function WrappedComments() {
  return (
    <Query query={GET_ID}>
      {({ data: { articleId, commentsElementId, }, }) => {
        console.log('article id', articleId);
        return articleId ? (
          <CommentsWithApollo articleId={articleId} contentId={commentsElementId} />
        ) : null;
      }}
    </Query>
  );
}

WrappedComments.propTypes = {};
WrappedComments.defaultProps = {};
export default WrappedComments;
