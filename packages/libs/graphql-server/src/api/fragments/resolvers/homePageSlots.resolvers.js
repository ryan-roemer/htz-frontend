export default {
  HomePageSlots: {
    main: ({ main, }) => {
      main.forEach((item, index) => {
        if (!item) {
          main[index] = {
            message: `Got Null in main slot of homepage, position: ${index}`,
            kind: 'error',
            errorCode: 6,
          };
        }
      });
      return main;
    },
  },
};
