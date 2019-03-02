import resolveType from '../../utils/resolveType';

export default {
  PolopolyObj: {
    __resolveType(value) {
      return resolveType(value.kind || value.inputTemplate);
    },
  },
};
