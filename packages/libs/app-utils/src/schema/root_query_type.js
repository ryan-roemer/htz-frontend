// eslint-disable-next-line import/no-extraneous-dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import CommentsElement from './types/comments_element_type';
import FinanceGraph from './types/finance/finance_graph_type';
import FinanceAsset from './types/finance/finance_asset_type';
import Footer from './types/footer_type';
import NavMenu from './types/navMenu_type';
import List from './types/list_type';
import ResetPassword from './types/reset_password_type';
import Page from './types/page_type';
import IsEmailValid from './types/is_email_valid_type';
import IsPhoneConnectedWithEmail from './types/is_phone_connected_with_email';
import IsPhoneValid from './types/is_phone_valid';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // article queries
    rankArticle: {
      args: {
        articleId: { type: new GraphQLNonNull(GraphQLString), },
        starRanking: { type: new GraphQLNonNull(GraphQLInt), },
      },
      type: GraphQLBoolean,
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.rateArticle(args);
      },
    },

    commentsElement: {
      type: CommentsElement,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, { dataSources, }) {
        return dataSources.PapiAPI.getCmLink(path);
      },
    },
    footer: {
      type: Footer,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getList(args);
      },
    },
    list: {
      type: List,
      args: {
        listId: { type: new GraphQLNonNull(GraphQLString), },
        history: { type: new GraphQLList(GraphQLID), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getList(args);
      },
    },
    navMenu: {
      type: NavMenu,
      args: { listId: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getList(args);
      },
    },
    nextArticle: {
      type: new GraphQLObjectType({
        name: 'NextArticle',
        fields: () => ({
          result: { type: GraphQLString, },
        }),
      }),
      args: {
        sectionId: { type: new GraphQLNonNull(GraphQLID), },
        readingHistory: { type: new GraphQLList(GraphQLID), },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.PapiAPI.getNextArticle(args);
      },
    },

    page: {
      type: Page,
      args: { path: { type: new GraphQLNonNull(GraphQLString), }, },
      resolve(parentValue, { path, }, { dataSources, }) {
        return dataSources.PageAPI.getPage(path);
      },
    },

    // reset password currently only used by purchase page, will be used by more apps later
    resetPassword: {
      args: { userName: { type: new GraphQLNonNull(GraphQLString), }, },
      type: ResetPassword,
      resolve(parentValue, { userName, }, { dataSources, }) {
        return dataSources.SsoAPI.resetPassword(userName);
      },
    },

    // Purchase page queries
    articleLinkData: {
      args: { id: { type: new GraphQLNonNull(GraphQLString), }, },
      type: new GraphQLObjectType({
        name: 'ArticleLinkData',
        fields: () => ({
          title: {
            type: GraphQLString,
          },
          url: {
            type: GraphQLString,
          },
        }),
      }),
      resolve(parentValue, { id, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getArticleLinkData(id);
      },
    },
    couponProduct: {
      args: { couponCode: { type: new GraphQLNonNull(GraphQLString), }, },
      type: GraphQLJSON,
      resolve(parentValue, { couponCode, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getCoupon(couponCode);
      },
    },
    payWithExistingCard: {
      args: {
        ssoID: { type: new GraphQLNonNull(GraphQLID), },
        productID: { type: new GraphQLNonNull(GraphQLInt), },
        firstName: { type: new GraphQLNonNull(GraphQLString), },
        lastName: { type: new GraphQLNonNull(GraphQLString), },
        saleCode: { type: new GraphQLNonNull(GraphQLInt), },
        promotionNumber: { type: new GraphQLNonNull(GraphQLInt), },
        email: { type: new GraphQLNonNull(GraphQLString), },
        sumPayment: { type: new GraphQLNonNull(GraphQLString), },
        thankYouEmailTemplate: { type: new GraphQLNonNull(GraphQLString), },
        description: { type: new GraphQLNonNull(GraphQLString), },
        lastFourDigits: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: new GraphQLObjectType({
        name: 'PayWithExistingCardResponse',
        fields: () => ({
          pId: {
            type: GraphQLString,
          },
          success: {
            type: GraphQLBoolean,
          },
        }),
      }),
      resolve(parentValue, paymentData, { dataSources, }) {
        return dataSources.SsoAPI.payWithExistingCard(paymentData);
      },
    },
    purchasePage: {
      type: GraphQLJSON,
      args: { path: { type: GraphQLString, }, },
      resolve(parentValue, { path, }, { dataSources, }) {
        return dataSources.PurchasePageAPI.getPage(path);
      },
    },

    assetData: {
      type: FinanceAsset,
      args: {
        assetId: { type: new GraphQLNonNull(GraphQLString), },
      },
      resolve(parentValue, { assetId, }, { dataSources, }) {
        return dataSources.FinanceAPI.getAsset(assetId);
      },
    },

    financeSearch: {
      type: new GraphQLList(FinanceAsset),
      args: {
        query: { type: new GraphQLNonNull(GraphQLString), },
        sortingOrder: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)), },
      },
      resolve(parentValue, { query, sortingOrder, }, { dataSources, }) {
        return dataSources.FinanceAPI.getAssetsList(query, sortingOrder);
      },
    },

    financeTable: {
      type: new GraphQLList(FinanceAsset),
      args: {
        assetsId: { type: new GraphQLList(GraphQLString), },
        parentId: { type: GraphQLString, },
        assetSubSection: { type: GraphQLString, },
        assetId: { type: GraphQLString, },
        count: { type: GraphQLInt, },
        sortBy: { type: GraphQLString, },
        sortOrder: { type: GraphQLString, },
        offset: { type: GraphQLInt, },
      },
      resolve(parentValue, args, { dataSources, }) {
        return dataSources.FinanceAPI.getTable(args);
      },
    },

    financeGraph: {
      type: FinanceGraph,
      args: {
        type: { type: GraphQLString, },
        time: { type: GraphQLString, },
        assetId: { type: GraphQLString, },
      },
      resolve(parentValue, { type, time, assetId, }, { dataSources, }) {
        return dataSources.FinanceAPI.getGraph(type, time, assetId);
      },
    },
    isEmailValid: {
      args: { email: { type: new GraphQLNonNull(GraphQLString), }, },
      type: IsEmailValid,
      resolve(parentValue, { email, }, context) {
        return context.isEmailValid.load(email).then(res => res);
      },
    },
    isPhoneValid: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString), },
        phone: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: IsPhoneValid,
      resolve(parentValue, args, context) {
        return context.isPhoneValid.load(args).then(res => res);
      },
    },
    isPhoneConnectedWithEmail: {
      args: {
        email: { type: new GraphQLNonNull(GraphQLString), },
        phone: { type: new GraphQLNonNull(GraphQLString), },
      },
      type: IsPhoneConnectedWithEmail,
      resolve(parentValue, args, context) {
        return context.isPhoneConnectedWithEmail.load(args).then(res => res);
      },
    },
  }),
});

export default RootQuery;
