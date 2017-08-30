import React from 'react';
import { Provider, } from 'react-fela';
import styleRenderer from './renderer';

/*
 * Provider component that makes the Fela renderer available via `context`.
 */
export default function StyleProvider() {
  return (
    <Provider renderer={styleRenderer}>
      {this.props.children}
    </Provider>
  );
}
