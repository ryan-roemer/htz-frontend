import resolveType from '../../../utils/resolveType';

export default {
  ArticleBodyItem: {
    __resolveType(item, context, info) {
      const type = item.tag ? 'Paragraph' : resolveType(item.kind || item.inputTemplate) || 'Content';

      return info.schema.getType(type);
    },
  },
};
