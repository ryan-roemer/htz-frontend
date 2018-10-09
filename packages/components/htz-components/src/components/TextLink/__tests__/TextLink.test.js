import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import TextLink from '../TextLink';

describe('<TextLink>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <TextLink href="test.com">I am a htzLink</TextLink>
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles ,', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <TextLink href="test.com" miscStyles={{ color: 'blue', }}>
            I am a htzLink
          </TextLink>
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with cusom tagName ,', () => {
      const { component, styles, } = felaSnapshotter(
        <TextLink tagName="button">I am a button</TextLink>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
