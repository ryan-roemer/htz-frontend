import React from 'react';

import {
  Masthead,
  Footer,
  GeneralAdSlot,
  HtmlElement,
  ElementGroup,
  Error,
  Debug,
} from '@haaretz/htz-components';
import HomePageList from '../components/List/HomePageList';

const elements = new Map([
  [ 'com.tm.ElementGroup', ElementGroup, ],
  [ 'com.tm.promotion.banner.TopRuler', ],
  [ 'com.tm.ResubscribeElementsGroup', ],
  [ 'com.tm.element.List', HomePageList, ],
  [ 'com.tm.promotion.banner.BottomRuler', ],
  [ 'com.tm.FooterElement', Footer, ],
  [ 'com.polobase.DfpBannerElement', GeneralAdSlot, ],
  [ 'com.tm.HtmlElement', HtmlElement, ],
  [ 'com.htz.EditableNavigationElement', Masthead, ],
  [ 'error', Error, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, contentId, kind, }) => {
  console.log(`
    Element of type: '${kind || inputTemplate}' is not supported and
    we don't have any component fot it yet.
    The id of the element you tried to render on this page is: ${contentId}.
  `);
  return (
    <Debug>
      <p>{`${kind || inputTemplate} is currently not supported`}</p>
    </Debug>
  );
};

export default function getHomepageElements(inputTemplate) {
  return elements.get(inputTemplate) || DefaultComponent;
}
