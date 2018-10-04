/* global document */
import React, { Fragment, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import {
  IconCheck,
  LayoutContainer,
  UserDispenser,
} from '@haaretz/htz-components';
import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ThankYouStage from '../../components/OfferPage/Stages/ThankYouStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';

// eslint-disable-next-line react/prop-types
const ThankYouElement = ({ product, userMessage, }) => (
  <FelaComponent style={{ textAlign: 'center', }}>
    <LayoutContainer bgc="white" miscStyles={{ paddingTop: '6rem', }}>
      <UserDispenser
        render={({ user, }) => (
          <StageTransition
            chosenSubscription={product}
            stage="thankYou"
            displayPhones={false}
            headerElement={
              <Fragment>
                <IconCheck color="positive" size={10} />
                <FelaComponent
                  style={theme => ({
                    marginTop: '3rem',
                    extend: [ theme.type(3), ],
                  })}
                  render={({
                    className,
                    theme: {
                      thankYou: { afterPurchase, secondaryHeader, },
                    },
                  }) => (
                    <div className={className}>
                      {product ? (
                        <p>{afterPurchase(product)}</p>
                      ) : (
                        userMessage.map(line => <p>{line}</p>)
                      )}
                    </div>
                  )}
                />
              </Fragment>
            }
            stageElement={<ThankYouStage />}
          />
        )}
      />
    </LayoutContainer>
  </FelaComponent>
);

class StageThankYou extends React.Component {
  componentDidMount() {
    // remove 'HtzRusr' cookie or TmRusr
    document.cookie =
      'HtzRusr=; domain=.haaretz.co.il; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie =
      'TmRusr=; domain=.themarker.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    let productId = null;
    if (this.props.url.query) {
      const {
        url: {
          query: { product, },
        },
      } = this.props;
      productId =
        product === '243'
          ? 'HTZ'
          : product === '273'
            ? 'TM'
            : product === '274'
              ? 'BOTH'
              : null;
    }
    return (
      <MainLayout isThankYou product={productId || false}>
        {productId ? (
          <ThankYouElement product={productId} />
        ) : (
          <OfferPageDataGetter
            render={({
              data: {
                purchasePage: { userMessage, },
              },
              loading,
              error,
            }) => {
              if (loading) return <div> Loading...</div>;
              if (error) return <div> Error...</div>;
              return <ThankYouElement userMessage={userMessage} />;
            }}
          />
        )}
      </MainLayout>
    );
  }
}

StageThankYou.propTypes = pagePropTypes;

StageThankYou.defaultProps = {};

export default StageThankYou;
