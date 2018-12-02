/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import { createLogger, } from '@haaretz/app-utils';
import Observer from 'react-intersection-observer';
import Query from '../ApolloBoundary/Query';
import Mutation from '../ApolloBoundary/Mutation';
import CommentSection from './CommentsSection';
import GET_ID from './queries/getId';
import FETCH_COMMENTS from './queries/fetchComments';
import SUBMIT_NEW_COMMENT from './mutations/submitNewComment';
import SUBMIT_NEW_VOTE from './mutations/submitNewVote';
import SUBMIT_NOTIFICATION_EMAIL from './mutations/submitNotificationEmail';
import REPORT_ABUSE from './mutations/reportAbuse';

const logger = createLogger({
  name: 'CommentsWithApollo',
});

class CommentsWithApollo extends React.Component {
  static propTypes = {
    /** The comment element ID from polopoly */
    contentId: PropTypes.string.isRequired,
    /** The article ID from polopoly */
    articleId: PropTypes.string.isRequired,
    /** react-intersection-observer  Margin around the root.
     * Can have values similar to the CSS margin property,
     * e.g. "10px 20px 30px 40px" (top, right, bottom, left). */
    rootMargin: PropTypes.string.isRequired,
  };

  state = {
    newCommentId: undefined,
    newCommentHash: undefined,
    loadedAllComments: false,
  };
  // todo: add optimistic response for voting

  initVote = (commentId, group, submitNewVote) => {
    const articleId = this.props.articleId;
    submitNewVote({
      variables: {
        commentId,
        articleId,
        group,
      },
    })
      .then(({ data, }) => {
        // console.warn(data.addVote.status);
      })
      .catch(mutationError => {
        logger.warn('there was an error sending the query', mutationError);
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
        logger.warn('there was an error sending the query', mutationError);
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
    const { contentId, rootMargin, } = this.props;
    return (
      <Observer triggerOnce rootMargin={rootMargin}>
        {inView =>
          (inView ? (
            <Query
              query={FETCH_COMMENTS}
              variables={{ path: `${contentId}?composite=true&limited=true`, }}
            >
              {({ data, loading, error, fetchMore, }) => {
                if (loading) {
                  return null;
                }
                if (error) {
                  logger.log(error);
                  return null;
                }
                const { commentsElement, } = data;
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
                                      this.initVote(commentId, group, submitNewVote);
                                    }}
                                    reportAbuse={(commentId, captchaKey) => {
                                      this.initReportAbuse(commentId, captchaKey, reportAbuse);
                                    }}
                                    initNewComment={(
                                      commentAuthor,
                                      commentText,
                                      parentCommentId
                                    ) => {
                                      this.initNewComment(
                                        commentAuthor,
                                        commentText,
                                        parentCommentId,
                                        submitNewComment
                                      );
                                    }}
                                    signUpNotification={email =>
                                      this.initSignUpNotificationEmail(
                                        email,
                                        submitNotificationEmail
                                      )
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
          ) : null)
        }
      </Observer>
    );
  }
}

function WrappedComments({ rootMargin, }) {
  return (
    <Query query={GET_ID}>
      {({ data: { articleId, commentsElementId, }, }) => {
        logger.trace('article id', articleId);
        return articleId ? (
          <CommentsWithApollo
            articleId={articleId}
            contentId={commentsElementId}
            rootMargin={rootMargin}
          />
        ) : null;
      }}
    </Query>
  );
}

WrappedComments.propTypes = {
  /** react-intersection-observer  Margin around the root.
   * Can have values similar to the CSS margin property,
   * e.g. "10px 20px 30px 40px" (top, right, bottom, left). */
  rootMargin: PropTypes.string.isRequired,
};
WrappedComments.defaultProps = {
  rootMargin: '2000px',
};
export default WrappedComments;
