const homePage = (_, args, { dataSources, }) => dataSources.PageAPI.getPage('/');

export default {
  Query: {
    homePage,
  },
};
