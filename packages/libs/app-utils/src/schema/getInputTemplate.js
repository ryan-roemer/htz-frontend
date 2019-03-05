const inputTemplates = new Map([
  [ 'HtzStandardArticle', 'com.htz.StandardArticle', ],
  [ 'TmStandardArticle', 'com.tm.StandardArticle', ],
  [ 'BlogArticle', 'com.tm.BlogArticle', ],
  [ 'ChangeableElementGroup', 'com.tm.element.group', ],
  [ 'MarketingToolSideBox', 'com.polobase.SideBoxMarketingElement', ],
  [ 'MouseStoryArticle', 'com.mouse.story.MouseStandardStory', ],
]);

export default name => inputTemplates.get(name);
