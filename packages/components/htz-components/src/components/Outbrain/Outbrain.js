/* global OBR */
import React from 'react';
import config from 'config';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import Query from '../ApolloBoundary/Query';
import { appendScript, } from '../../utils/scriptTools';

const GET_OUTBRAIN_DATA = gql`
  query GetOutbrainData {
    articleId @client
    isMouseStory @client
  }
`;

class Outbrain extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      writeData: PropTypes.func,
    }).isRequired,
  };

  site = config.get('domain');

  componentDidMount() {
    appendScript({
      src: 'https://widgets.outbrain.com/outbrain.js',
      id: 'outbrain',
      isAsync: false,
      updateFunction: () => {
        if (OBR) {
          OBR.extern.reloadWidget();
        }
      },
    });
    this.props.client.writeData({ data: { osakaCanRender: true, }, });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.props.client.writeData({ data: { osakaCanRender: false, }, });
  }

  render() {
    return (
      <Query query={GET_OUTBRAIN_DATA}>
        {({ data: { articleId, isMouseStory, }, }) => (isMouseStory ? null : (
          <div
            className="OUTBRAIN"
            data-src={`https://www.${this.site}/${articleId}`}
            data-widget-id="AR_14"
            data-ob-template="haaretz-heb"
          />
        ))
        }
      </Query>
    );
  }
}

const OutbrainWithClient = props => (
  <ApolloConsumer>
    {client => <Outbrain client={client} {...props} />}
  </ApolloConsumer>
);

export default OutbrainWithClient;
