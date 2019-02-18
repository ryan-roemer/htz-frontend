// @flow

import React from 'react';
import {
  List,
  Debug,
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

import type { Node, } from 'react';
import type { ListDataType, } from '@haaretz/htz-components';


const viewsList = new Map([
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

function HomePageList({ view, ...props }: ListDataType): Node {
  if ([ ...viewsList.keys(), ].includes(view)) {
    return (
      <List View={viewsList.get(view)} {...props} />
    );
  }
  return <Debug>{`${view} is not supported list view for the HomePage`}</Debug>;
}

export default HomePageList;
