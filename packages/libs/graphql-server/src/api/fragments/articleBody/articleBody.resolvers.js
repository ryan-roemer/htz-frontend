import resolveType from '../../../utils/resolveType';

export default {
  ArticleBodyItem: {
    __resolveType(value) {
      return resolveType(value.tag ? 'Paragraph' : value.kind || value.inputTemplate) || 'Content';
    },
  },
};
