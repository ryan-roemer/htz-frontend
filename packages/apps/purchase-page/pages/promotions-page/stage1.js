import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ChooseSlotStage from '../../components/OfferPage/Stages/ChooseSlotStage';
import Redirect from '../../components/Redirect/Redirect';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';

// todo: remove unused fields from the query
const GET_PROMOTIONS_STATE = gql`
  query {
    promotionsPageState @client {
      subStage
    }
  }
`;

const getChooseSlotsData = slots =>
  slots.map(slot => {
    const { offerList, cancelButtonText, ...cleanData } = slot.products[0];
    return {
      subscriptionName: slot.subscriptionName,
      ...cleanData,
    };
  });

class Stage1 extends React.Component {
  state = {
    mounted: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true,
    });
  }

  render() {
    return (
      <MainLayout>
        <StageCounter stage={1} />
        {this.state.mounted && (
          <OfferPageDataGetter
            render={({ data, loading, error, }) => {
              if (loading) return <div> Loading...</div>;
              if (error) return <div> Error...</div>;
              const { slots, pageNumber, } = data.purchasePage;
              return pageNumber >= 7 ? (
                <Redirect destination="/promotions-page/thankYou" replace />
              ) : slots.length > 1 ? (
                <Query query={GET_PROMOTIONS_STATE}>
                  {({ data: clientData, }) => {
                    const { promotionsPageState: { subStage, }, } = clientData;
                    return (
                      <ChooseSlotStage
                        tableData={getChooseSlotsData(slots)}
                        subStage={subStage}
                        userMessage={data.purchasePage.userMessage}
                      />
                    );
                  }}
                </Query>
              ) : (
                <Redirect destination="/promotions-page/stage2" replace />
              );
            }}
          />
        )}
      </MainLayout>
    );
  }
}

Stage1.propTypes = pagePropTypes;

Stage1.defaultProps = {};

export default withData(Stage1);
