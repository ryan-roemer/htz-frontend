export default {
  Content: {
    properties(content) {
      const { contentId, contentName, inputTemplate, ...properties } = content;
      return properties;
    },
  },
};
