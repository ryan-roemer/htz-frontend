export default {
  Interactive: {
    properties(content) {
      const { contentId, contentName, inputTemplate, kind, ...properties } = content;
      return properties;
    },
  },
};
