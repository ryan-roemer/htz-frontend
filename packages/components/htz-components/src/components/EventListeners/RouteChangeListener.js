// @flow
import * as React from 'react';
import Router from 'next/router';
import { clearTeasersInPage, } from '../List/ListDuplication';
// import PropTypes from 'prop-types';
// import { UPDATE_SCROLL, } from './ScrollStoreMutator';
// import Mutation from '../ApolloBoundary/Mutation';

export default function RoutChangeLiatener(): null {
  React.useEffect(() => {
    Router.onRouteChangeComplete = () => {
      // Clear record of teasers in page when navigating
      // to a new page on the client side, so that duplication
      // checks are cleared and aren't based on the old page
      clearTeasersInPage();
    };

    return () => { Router.onRouteChangeStart = null; };
  });
  return null;
}
