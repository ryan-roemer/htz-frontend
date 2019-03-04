const articleType = new Map([
  [ 'regularArticle', 'RegularArticleData', ],
]);

export default {
  ArticleData: {
    __resolveType(articleData) {
      return articleType.get(articleData.articleType);
    },
  },
};
