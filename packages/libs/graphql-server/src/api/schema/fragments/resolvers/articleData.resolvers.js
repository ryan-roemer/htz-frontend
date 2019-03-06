const header = data => {
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
};

const body = ({ body, contentId, }) => {
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
};

const mainElement = ({ body, }) => (
  body[0].inputTemplate === 'com.tm.Image'
    ? body.splice(0, 1)[0]
    : null
);

export default {
  RegularArticleData: {
    header,
    body,
  },
  MouseRegularArticleData: {
    header,
    mainElement,
    body,
  },
};
