// todo: move to fela-utils
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount, } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderToString, } from 'fela-tools';
// import toJson from 'enzyme-to-json';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createTheme, } from 'fela-bindings';

/*
 * A factory for creating a Enzyme renderers of Fela components
 * with package configuration backed in.
 *
 * @param {function} testRenderer - The Fela renderer used in the targes package's tests
 * @param {Object} [theme] - The `theme` object used in the target package
 *
 * @return {Object} - An Object with `shallow` and `mount` methods for testing
 * Fela components with Enzyme
 */
export default function createFelaEnzymeRenderers(renderer, theme) {
  function felaShallow(node, options = {}) {
    const component = shallow(node, {
      context: {
        renderer,
        theme,
      },
      ...options,
    });

    // component.snapshot = snapshot(component, renderer);
    return component;
  }

  function felaMount(node, options = {}, userTheme) {
    const chosenTheme = userTheme || theme;
    const component = mount(node, {
      childContextTypes: {
        renderer: PropTypes.object,
        theme: PropTypes.object,
      },
      context: {
        renderer,
        theme: createTheme(chosenTheme),
      },
      ...options,
    });

    // component.snapshot = snapshot(component, renderer);
    return component;
  }

  return { felaMount, felaShallow, };
}

// function snapshot(component, renderer) {
//   return () => ({
//     component: toJson(component),
//     // you should prettify this string
//     styles: renderToString(renderer),
//   });
// }
