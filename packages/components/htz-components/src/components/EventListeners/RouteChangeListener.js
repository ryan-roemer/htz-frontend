// @flow
/* global permutive */
import * as React from 'react';
import Router from 'next/router';
import { clearTeasersInPage, } from '../List/ListDuplication';
// import Mutation from '../ApolloBoundary/Mutation';

declare var permutive: any;

export default function RoutChangeLiatener(): null {
  React.useEffect(() => {
    Router.onRouteChangeComplete = () => {
      // Clear record of teasers in page when navigating
      // to a new page on the client side, so that duplication
      // checks are cleared and aren't based on the old page
      clearTeasersInPage();
      typeof permutive !== 'undefined' && permutive.addon('web', {});
    };

    return () => { Router.onRouteChangeStart = null; };
  });
  return null;
}
