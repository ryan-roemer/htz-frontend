export default {
  ChangeableElementGroup: {
    totalDisplay: ({ contentLists, }) => {
      let duration = 0;
      contentLists.forEach(item => { duration += item.displayDuration; });
      return duration;
    },
  },
};
