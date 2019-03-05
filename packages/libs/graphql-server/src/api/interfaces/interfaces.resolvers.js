const articleType = new Map([
  [ 'regularArticle', 'RegularArticleData', ],
]);

export default {
  ArticleData: {
    __resolveType(articleData, context, info) {
      const type = articleType.get(articleData.articleType);
      return info.schema.getType(type);
    },
  },
};
