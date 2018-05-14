/* global window */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Router from 'next/router';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, IconHtzLoader, IconTmLoader, } from '@haaretz/htz-components';

const GET_HOST_NAME = gql`
  query {
    hostname @client
  }
`;

const styles = ({ iframeHeight, loading, theme, }) => ({
  width: '100%',
  maxWidth: '96rem',
  height: iframeHeight,
  overflow: 'hidden',
  marginTop: '7rem',
  border: 'none',
  ...(loading && { display: 'none', }),
  extend: [ theme.mq({ until: 's', }, { marginTop: '5rem', }), ],
});

class CreditCardIframe extends Component {
  static propTypes = {
    /**
     * paymentData
     */
    creditGuardSrc: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  state = {
    error: false,
    errorMessage: null,
    iframeHeight: '60rem',
    loading: false,
  };

  componentDidMount() {
    this.ifr.onload = () => {
      console.log('iframe loaded');
      this.setState({
        loading: false,
      });
    };
    window.addEventListener('message', evt => this.handleFrameTasks(evt));
  }

  componentWillUnmount() {
    console.log('unmounting');
    window.removeEventListener('message', this.handleFrameTasks);
  }

  handleFrameTasks = evt => {
    // console.log('got message', evt);
    const msgData = evt.data;
    if (msgData.type === 'cgmessage') {
      switch (msgData.command) {
        case 'resize_payment_form':
          this.setState({
            iframeHeight: msgData.data.height,
          });
          break;

        case 'thank_user':
          console.log('got Thank you message', msgData);
          Router.replace(
            `/promotions-page/thankYou?msg=thank_user&product=${
              msgData.data.pid
            }`
          );
          break;

        case 'error_user':
          console.log('got error', msgData);
          this.setState({
            error: true,
            errorMessage: msgData.data.message,
          });
          break;

        case 'page_busy':
          console.log('page busy');
          this.setState({
            loading: true,
          });
          break;

        case 'page_idle':
          console.log('page idle');
          this.setState({
            loading: false,
          });
          break;

        case 'purchase_clicked':
          console.log('page purchase');
          console.log(msgData);
          // const userdata = PromotionsUtil.getUserData();
          // const additionalInfo = {
          //   promotionsNumber: userdata.selectedOffer.promotionNumber,
          //   productID: userdata.selectedOffer.productId,
          //   saleCode: userdata.selectedOffer.saleCode,
          // };
          // StatUtil.doAction('37', additionalInfo);
          // if (window.track) {
          //   const action = `subscription${window.userSelectedMonthly ? ' monthly' : ' yearly'}`;
          //   const label = `Subscribe button${
          //     window.userSwitchedFromMonthlyToYearly ? ' from try yearly' : ''
          //   }`;
          //   window.track('Promotions - subscription', action, label);
          // }
          // GaTm.eventManager.fireButtonClickEvent({ event: 'promotions_offer-creditguard_payment', });
          break;
        default:
          console.log('default');
          break;
      }
      // }
    }
  };

  render() {
    const { creditGuardSrc, } = this.props;
    return (
      <Query query={GET_HOST_NAME}>
        {({ data: { hostname, }, }) => {
          const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
          const LoaderIcon =
            host === 'themarker.com' ? IconTmLoader : IconHtzLoader;
          return (
            <div>
              {this.state.loading ? (
                <LoaderIcon
                  size={15}
                  color="primary"
                  miscStyles={{ marginTop: '15rem', marginBottom: '25rem', }}
                />
              ) : null}
              {this.state.error ? (
                <FelaComponent
                  rule={{
                    color: 'red',
                    marginTop: '19rem',
                  }}
                  render={({ className, theme: { creditCardIframe, }, }) => (
                    <div>
                      <div className={className}>
                        {this.state.errorMessage ||
                          creditCardIframe.defaultErrorMessage}
                      </div>
                      <Button
                        variant="primaryOpaque"
                        onClick={() =>
                          this.setState({ errorMessage: null, error: false, })
                        }
                        miscStyles={{
                          marginTop: '6rem',
                          marginBottom: '25rem',
                        }}
                        boxModel={{ vp: 1, hp: 5, }}
                      >
                        {creditCardIframe.tryAgain}
                      </Button>
                    </div>
                  )}
                />
              ) : (
                <FelaComponent
                  iframeHeight={this.state.iframeHeight}
                  loading={this.state.loading}
                  rule={styles}
                  render={({ className, }) => (
                    <iframe
                      className={className}
                      title="secure-credit-card-form"
                      //  todo: go over this list
                      sandbox="allow-forms allow-popups allow-pointer-lock allow-scripts"
                      scrolling="no"
                      src={creditGuardSrc}
                      ref={element => {
                        this.ifr = element;
                      }}
                    />
                  )}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CreditCardIframe;
