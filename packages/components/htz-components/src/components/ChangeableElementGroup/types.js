// @flow

type Content = {
  contentName: string,
  contentId: string,
  inputTemplate: string,
  properties?: Object,
};
type DfpBannerType = {
  contentName: string,
  contentId: string,
  inputTemplate: string,
  id: string,
  style: string,
  audianceTarget: string,
  hideOnSite: boolean,
  properties?: Object,
};
type GridElementGroup = {
  contentName: string,
  contentId: string,
  inputTemplate: string,
  items: Array<DfpBannerType>,
  properties?: Object,
};
type ListType = {
  contentName: string,
  contentId: string,
  inputTemplate: string,
  title: string,
  view: string,
  hasPagination: boolean,
  properties?: Object,
};

export type ContentType = {
  displayDuration: number,
  content: DfpBannerType | GridElementGroup | ListType | Content,
};

export type PropTypes = {
  scrollY: number,
  contentLists: Array<ContentType>,
  totalDisplay: number,
};

export type StateTypes = {
  someoneIsAnimating: boolean,
  elementIndex: ?number,
};
