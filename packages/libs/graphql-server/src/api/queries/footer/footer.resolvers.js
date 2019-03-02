const footer = (_, args, { dataSources, }) => dataSources.PapiAPI.getList(args.input);

export default {
  Query: {
    footer,
  },
};
