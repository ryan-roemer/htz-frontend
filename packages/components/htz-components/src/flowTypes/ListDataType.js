// @flow

import type { TeaserDataType, } from './TeaserDataType';
import type { ListExtraLinkType, } from './ListExtraLinkType';

export type ListDataType = {
  title?: string,
  extraLinks?: ListExtraLinkType[],
  commercialLinks?: ListExtraLinkType[],
  // `commercialLinks` and `marketingTeaser` occupy the same
  // sapce, and should therefore be mutually exclusive, with
  // `marketingTeaser` taking precedence. So, if a list have both,
  // only `marketingTeaser` should be placed in the JSON
  marketingTeaser?: {
    title: string,
    href: string,
    subtitle?: string,
    CTA: string,
  },
  items: TeaserDataType[],
  contentId: string,
  contentName: string,
  hasPagination: boolean,
  inputTemplate: "com.tm.element.List" | "com.tm.ListElement",
  view: string,
  url?: string,
};
