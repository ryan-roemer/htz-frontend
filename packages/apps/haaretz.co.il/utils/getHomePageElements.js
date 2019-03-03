import React from 'react';

import {
  // General Components
  Debug,
  ElementGroup,
  Error,
  Footer,
  GeneralAdSlot,
  HtmlElement,
  List,
  Masthead,

  // list views
  Beavis,
  Bender,
  Boxy,
  Butthead,
  Calculon,
  Clampazzo,
  Conrad,
  Donatello,
  Donbot,
  Hawking,
  Gamal,
  Kroker,
  Leonardo,
  Michelangelo,
  Mom,
  Mousepad,
  Morbo,
  Panucci,
  Pazuzu,
  Slim,
  Slugs,
  Spawn,
  Wong,
  Zapp,
  Zombie,
  Vogel,
} from '@haaretz/htz-components';

const elements = new Map([
  // General components
  [ 'com.tm.ElementGroup', ElementGroup, ],
  [ 'com.tm.promotion.banner.TopRuler', ],
  [ 'com.tm.ResubscribeElementsGroup', ],
  [ 'com.tm.element.List', List, ],
  [ 'com.tm.promotion.banner.BottomRuler', ],
  [ 'com.tm.FooterElement', Footer, ],
  [ 'com.polobase.DfpBannerElement', GeneralAdSlot, ],
  [ 'com.tm.HtmlElement', HtmlElement, ],
  [ 'com.htz.EditableNavigationElement', Masthead, ],
  [ 'error', Error, ],

  // list views
  [ 'Beavis', Beavis, ],
  [ 'Bender', Bender, ],
  [ 'Boxy', Boxy, ],
  [ 'Butthead', Butthead, ],
  [ 'Calculon', Calculon, ],
  [ 'Clampazzo', Clampazzo, ],
  [ 'Conrad', Conrad, ],
  [ 'Donatello', Donatello, ],
  [ 'Donbot', Donbot, ],
  [ 'Hawking', Hawking, ],
  [ 'Gamal', Gamal, ],
  [ 'Kroker', Kroker, ],
  [ 'Leonardo', Leonardo, ],
  [ 'Michelangelo', Michelangelo, ],
  [ 'Mom', Mom, ],
  [ 'Mousepad', Mousepad, ],
  [ 'Morbo', Morbo, ],
  [ 'Panucci', Panucci, ],
  [ 'Pazuzu', Pazuzu, ],
  [ 'Slim', Slim, ],
  [ 'Slugs', Slugs, ],
  [ 'Spawn', Spawn, ],
  [ 'Wong', Wong, ],
  [ 'Zapp', Zapp, ],
  [ 'Zombie', Zombie, ],
  [ 'Vogel', Vogel, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, contentId, kind, }) => {
  console.log(`
    Element of type: '${kind || inputTemplate}' is not supported
    in the homepage and we don't have any component for it yet.

    The id of the element you tried to render on this page is: ${contentId}.
  `);
  return (
    <Debug>
      <p>
        {`${kind
        || inputTemplate} is currently not supported in the homepage`}
      </p>
    </Debug>
  );
};

export default function getHomepageElements(inputTemplate) {
  return elements.get(inputTemplate) || DefaultComponent;
}
