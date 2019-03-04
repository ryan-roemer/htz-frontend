import resolveType from '../../../utils/resolveType';

export default {
  HeadlineElement: {
    __resolveType(headlineElement) {
      return resolveType(headlineElement.kind || headlineElement.inputTemplate);
    },
  },
};
