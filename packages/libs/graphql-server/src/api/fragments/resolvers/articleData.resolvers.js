export default {
  RegularArticleData: {
    header: data => {
      const {
        exclusive,
        mobileExclusive,
        mobileSubtitle,
        mobileTitle,
        modDate,
        pubDate,
        reportingFrom,
        subtitle,
        title,
      } = data;

      return {
        exclusive,
        mobileExclusive,
        mobileSubtitle,
        mobileTitle,
        modDate,
        pubDate,
        reportingFrom,
        subtitle,
        title,
      };
    },
    mainElement: articleData => {
      const isMouseFirstElementImage = articleData.inputTemplate === 'com.mouse.story.MouseStandardStory'
        && articleData.body[0].inputTemplate === 'com.tm.Image';

      return isMouseFirstElementImage
        ? articleData.body.splice(0, 1)[0]
        : articleData.mainElement;
    },
    body: ({ body, contentId, }) => {
      body.forEach((item, index) => {
        if (!item) {
          body[index] = {
            message: `Got Null in body of article ${contentId}, position: ${index}`,
            kind: 'error',
            errorCode: 6,
          };
        }
      });
      return body;
    },
  },
};
