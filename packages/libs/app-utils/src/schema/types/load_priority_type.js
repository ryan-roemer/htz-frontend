import { GraphQLEnumType, } from 'graphql';

const LoadPriority = new GraphQLEnumType({
  name: 'LoadPriority',
  values: {
    client: { value: 'client', },
    ssr: { value: 'ssr', },
    lazy: { value: 'lazy', },

  },
});

export default LoadPriority;
