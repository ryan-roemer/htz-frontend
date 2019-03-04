const page = (_, args, { dataSources, }) => dataSources.PageAPI.getPage(args.input.path);

export default {
  Query: {
    page,
  },
  Page: {
    contentId: ({ lineage, }) => lineage[0].contentId,
    contentName: ({ lineage, }) => lineage[0].contentName,
    articleData({ slots: { article, }, }) {
      let result = null;
      if (article) {
        article.find((item, index) => {
          if (item.articleType) {
            article[index] = {
              inputTemplate: item.inputTemplate,
              contentId: item.contentId,
              contentName: item.contentName,
            };
            result = item;
            return true;
          }
          return false;
        });
      }
      return result;
    },
  },
};
