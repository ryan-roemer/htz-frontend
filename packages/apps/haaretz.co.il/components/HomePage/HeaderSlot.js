// @flow
import React from 'react';
import { IconHaaretzHomepageMasthead, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import getElements from '../../utils/getHomePageElements';

type Props = {
  content: Array<Object>,
};

function HeaderSlot({ content, }: Props): Node {
  if (content) {
    return content.map(element => {
      const Element = getElements(element.inputTemplate);
      return (
        <Element
          key={element.contentId}
          {...element}
          {...(element.inputTemplate === 'com.htz.EditableNavigationElement'
            ? {
              pageType: 'homepage',
              rowBgc: 'transparent',
              logo: IconHaaretzHomepageMasthead,
            }
            : {})}
        />
      );
    });
  }
  return null;
}

export default HeaderSlot;
