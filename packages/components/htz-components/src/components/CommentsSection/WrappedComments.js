import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation, } from '../ApolloBoundary/ApolloBoundary';
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
        console.warn('there was an error sending the query', mutationError);
      });
  };

  initNewComment = (
    commentAuthor,
    commentText,
    parentCommentId,
    submitNewComment
  ) => {
    const articleId = this.props.articleId;
    const commentElementId = this.props.contentId;
    submitNewComment({
      variables: {
        commentText,
        commentAuthor,
        articleId,
        commentElementId,
        parentCommentId,
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
        variables={{ path: `${contentId}?composite=true&limited=true`, }}
      >
        {({ data, loading, error, fetchMore, }) => {
          if (loading) {
            return <div>loading ...</div>;
          }
          if (error) {
            console.log(error);
            return <h1>ERROR</h1>;
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
                                this.initReportAbuse(
                                  commentId,
                                  captchaKey,
                                  reportAbuse
                                );
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
                              loadAllComments={() =>
                                this.handleLoadAllComments(fetchMore)
                              }
                              comments={commentsElement.comments}
                              commentsPlusRate={
                                commentsElement.commentsPlusRate
                              }
                              commentsMinusRate={
                                commentsElement.commentsMinusRate
                              }
                              totalHits={commentsElement.totalHits}
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
          <CommentsWithApollo
            articleId={articleId}
            contentId={commentsElementId}
          />
        ) : null;
      }}
    </Query>
  );
}
export default WrappedComments;
