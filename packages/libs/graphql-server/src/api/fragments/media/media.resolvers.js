import resolveType from '../../../utils/resolveType';

export default {
  Media: {
    __resolveType(value) {
      return resolveType(value.kind || value.inputTemplate);
    },
  },
};
