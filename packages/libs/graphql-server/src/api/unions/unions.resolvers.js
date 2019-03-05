import resolveType from '../../utils/resolveType';

// eslint-disable-next-line no-underscore-dangle
function __resolveType(item, context, info) {
  const type = item.tag ? 'Paragraph' : resolveType(item.kind || item.inputTemplate) || 'Content';
  return info.schema.getType(type);
}

export default {
  ArticleBodyItem: {
    __resolveType,
  },
  ElementGroupItemContent: {
    __resolveType,
  },
  GridElementItemContent: {
    __resolveType,
  },
  HeadlineElement: {
    __resolveType,
  },
  HomePageElement: {
    __resolveType,
  },
  MainBlockComponent: {
    __resolveType,
  },
  Media: {
    __resolveType,
  },
  MobileListWrapperItems: {
    __resolveType,
  },
  SideBar: {
    __resolveType,
  },
  TabElementItem: {
    __resolveType,
  },
};
