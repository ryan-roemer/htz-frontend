// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLInputObjectType, GraphQLString, GraphQLID, } from 'graphql';

const CommentInput = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: () => ({
    articleId: { type: GraphQLString, },
    commentElementId: { type: GraphQLID, },
    parentCommentId: { type: GraphQLString, },
    commentText: { type: GraphQLString, },
    commentAuthor: { type: GraphQLString, },
    cookie: { type: GraphQLString, },
  }),
});

export default CommentInput;
