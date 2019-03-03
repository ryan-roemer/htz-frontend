// @flow
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

type TesersInPage = Array<string>;

let teasersInPage: TesersInPage = [];

export function updateTeasersInPage(listItems: Array<TeaserDataType>): void {
  if (!listItems) return undefined;

  const articlesInList = listItems.reduce((articleIds, item) => {
    const { representedContent, contentId, } = item;
    articleIds.push(representedContent || contentId);
    return articleIds;
  }, []);

  teasersInPage = [ ...new Set([ ...teasersInPage, ...articlesInList, ]), ];
  return undefined;
}

export function getTeasersInPage(): Array<string> {
  return teasersInPage;
}

export function clearTeasersInPage() {
  teasersInPage = [];
}
