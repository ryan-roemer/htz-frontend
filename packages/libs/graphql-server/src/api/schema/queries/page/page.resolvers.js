const page = (_, args, { dataSources, }) => dataSources.PageAPI.getPage(args.input.path);

export default {
  Query: {
    page,
  },
  Page: {
    contentId({ lineage, }) {
      return lineage[0].contentId;
    },
    contentName({ lineage, }) {
      return lineage[0].name;
    },
    articleData({ slots: { article, }, }) {
      let result = null;
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
      return result;
    },
  },
};
