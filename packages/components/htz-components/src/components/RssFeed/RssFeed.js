// @flow
import * as React from 'react';
import SalView from '../List/views/Sal/SalView';
import Debug from '../Debug/Debug';

import type { RssFeedType, } from '../../flowTypes/RssFeedType';
import type { ListDataType, } from '../../flowTypes/ListDataType';

function rssDataToListData(rssData: RssFeedType): ListDataType {
  return {
    title: rssData.title,
    contentName: rssData.title,
    contentId: rssData.contentId,
    hasPagination: false,
    inputTemplate: 'com.tm.ListElement',
    isLazyloadImages: true,
    lazyLoadImages: true,
    view: 'Sal',
    items: rssItemsToTeaserData(rssData.items, rssData.contentId),
  };
}

/**
 * Converts rss item to teaser-data item.
 * @param {Array<Object>} items RSS items array
 * @param {string} keyPrefix a prefix for building uniqe id for each RSS item.
 */
function rssItemsToTeaserData(items, keyPrefix) {
  return !items
    ? []
    : items.map((item, idx) => {
      const publishedDate = item.publishedDate
        ? new Date(item.publishedDate).getTime()
        : null;

      return {
        image: rssItemImageToImage(item.imageUrl),
        kind: 'teaser',
        publishDate: publishedDate || null,
        contentId: `${keyPrefix}_${idx}`,
        title: item.title,
        titleMobile: item.title,
        inputTemplate: 'com.tm.TeaserData',
        path: item.link,
        linkTarget: '_blank',
        representedContent: `${keyPrefix}_${idx}`,
        representedContentType: 'externalContent',
      };
    });
}

/**
 * Convert RSS items image to PAPI Image data.
 * @param {Array<string>} rssImage Array of images urls.
 */
function rssItemImageToImage(rssImage) {
  let image = null;

  if (Array.isArray(rssImage) && rssImage.length > 0) {
    image = {
      contentName: '',
      imgArray: [
        {
          imgName: rssImage[0],
          aspects: {
            full: {
              width: 168,
              height: 126,
            },
          },
        },
      ],
      isExternal: true,
      imageType: 'image',
      inputTemplate: 'com.tm.Image',
      contentId: rssImage[0],
      kind: 'image',
    };
  }

  return image;
}

export default function RssFeed(props: RssFeedType) {
  const dataAsList: ListDataType = rssDataToListData(props);
  return dataAsList.items.length >= 4 ? (
    <SalView
      {...{
        list: dataAsList,
        isLazyloadImages: dataAsList.isLazyloadImages,
        biAction: null,
        gaAction: null,
      }}
    />
  ) : (
    <Debug>
      <p>{`element of type ${props.inputTemplate} not rendered`}</p>
      <p>{`Expected at least 4 items but got ${dataAsList.items.length}`}</p>
    </Debug>
  );
}
