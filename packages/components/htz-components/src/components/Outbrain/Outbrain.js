/* global OBR */
import React from 'react';
import gql from 'graphql-tag';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import { appendScript, } from '../../utils/scriptTools';

const GET_CANONICAL_URL = gql`
  query GetCanonicalUrl {
    canonicalUrl @client
  }
`;

class Outbrain extends React.Component {
  componentDidMount() {
    appendScript({
      src: 'https://widgets.outbrain.com/outbrain.js',
      id: 'outbrain',
      isAsync: false,
      updateFunction: () => {
        console.log(' updatin outbrain');
        if (OBR) {
          OBR.extern.reloadWidget();
        }
      },
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Query query={GET_CANONICAL_URL}>
        {({ data: { canonicalUrl, }, }) => (
          <div
            className="OUTBRAIN"
            data-src={canonicalUrl}
            data-widget-id="AR_14"
            data-ob-template="haaretz-heb"
          />
        )}
      </Query>
    );
  }
}

export default Outbrain;
