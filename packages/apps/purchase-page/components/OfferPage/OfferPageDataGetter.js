import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter, } from 'next/router';
import { extractParamFromUrl, Query, UserDispenser, } from '@haaretz/htz-components';

const GET_PURCHASE_PAGE_DATA = gql`
  query PageData($path: String!, $userId: ID, $hasFacebookToken: Boolean) {
    purchasePage(path: $path, userId: $userId, hasFacebookToken: $hasFacebookToken)
  }
`;

const propTypes = {
  render: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
};

export function getCampaignFromPath(path) {
  return `/${extractParamFromUrl('offer', path) || ''}`;
}

function hasFacebookToken(query) {
  return !!query.account_linking_token;
}

// todo: maybe use refetch with new variables after login
//  when this bug is fixed: https://github.com/apollographql/react-apollo/issues/1929
//  then we might be able to remove user dispenser here and use it only with the login redirect
function OfferPageDataGetter({ render, router, }) {
  return (
    <Fragment>
      <UserDispenser
        render={({ user: { id, }, }) => (
          <Query
            query={GET_PURCHASE_PAGE_DATA}
            variables={{
              path: getCampaignFromPath(router.asPath),
              userId: id,
              hasFacebookToken: hasFacebookToken(router.query),
            }}
          >
            {({ loading, error, data, refetch, client, }) => render({
              data,
              loading,
              error,
              refetch,
              client,
            })
            }
          </Query>
        )}
      />
    </Fragment>
  );
}

OfferPageDataGetter.propTypes = propTypes;

export default withRouter(OfferPageDataGetter);
