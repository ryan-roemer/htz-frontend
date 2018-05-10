import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { withRouter, } from 'next/router';
import { parseTypographyProp, } from '@haaretz/htz-css-tools';
import { Link, } from '@haaretz/htz-components';
import DesktopView from './ChooseSlotsStageElements/DesktopView';
import MobileView from './ChooseSlotsStageElements/MobileView';
import SubHeader from './ChooseSlotsStageElements/SubHeader';
import UserMessage from './Elements/UserMessage';
import StageCounter from './Elements/StageCounter';
import { friendlyRoutes, } from '../../../routes/routes';

const propTypes = {
  hostname: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionName: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(PropTypes.object),
      couponExist: PropTypes.bool,
    })
  ).isRequired,
  subStage: PropTypes.number.isRequired,
  userMessage: PropTypes.arrayOf(PropTypes.string),
  /** passed by next withRouter */
  router: PropTypes.shape().isRequired,
};

const defaultProps = {
  userMessage: null,
};

const contStyle = theme => ({
  textAlign: 'center',
  marginBottom: '11rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  extend: [ theme.mq({ from: 'm', }, { maxWidth: '90%', }), ],
});

const moreOptionsContStyle = ({ theme, }) => ({
  marginTop: '6rem',
  color: theme.color('offerPage', 'buttonText'),
  flexDirection: 'column',
  extend: [
    theme.mq(
      { until: 'l', },
      {
        display: 'inline-flex',
      }
    ),
    theme.mq(
      { from: 'l', },
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    ),
  ],
});

const StyledMoreOptionsCont = createComponent(moreOptionsContStyle);

const headingStyle = ({ theme, }) => ({
  textAlign: 'center',
  fontWeight: 'normal',
  paddingInlineStart: '4rem',
  paddingInlineEnd: '4rem',
  marginTop: '2rem',
  extend: [
    parseTypographyProp(
      [ { until: 'l', value: 3, }, { from: 'l', value: 5, }, ],
      theme.type
    ),
  ],
});

const StyledHeading = createComponent(headingStyle, 'h1');

function ChooseSlotStage({
  hostname,
  tableData,
  subStage,
  userMessage,
  router,
}) {
  // eslint-disable-next-line prefer-const
  let [ pathWithoutQuery, queryPartFromPath, ] = router.asPath.split(/\?(.+)/);
  pathWithoutQuery = pathWithoutQuery.substr(
    0,
    pathWithoutQuery.lastIndexOf('/')
  );
  const asPath = `${pathWithoutQuery}/${friendlyRoutes.stage2}`;
  const pathName = '/promotions-page/stage2';

  const continueToNextStage = ({ cache, idx, routerPush = false, }) => {
    cache.writeData({
      data: {
        promotionsPageState: {
          stage: 3,
          subStage: subStage === 3 ? 4 : subStage === 4 ? 3 : subStage,
          chosenSlotIndex: idx,
          __typename: 'PromotionsPageState',
        },
      },
    });
    if (routerPush) {
      router.push(
        pathName,
        queryPartFromPath ? `${asPath}?${queryPartFromPath}` : asPath
      );
    }
    else {
      router.replace(
        pathName,
        queryPartFromPath ? `${asPath}?${queryPartFromPath}` : asPath
      );
    }
  };

  const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
  return (
    <FelaComponent
      style={contStyle}
      render={({
        className,
        theme: {
          stage1,
          stage1: {
            headerText,
            buttons: { entitlements, organizationSubscription, },
          },
        },
      }) => (
        <Fragment>
          <StageCounter stage={1} />
          <StyledHeading>{headerText}</StyledHeading>
          <SubHeader isTheMarker={host === 'themarker.com'} />
          <div className={className}>
            <UserMessage userMessage={userMessage} />
            <DesktopView
              tableData={tableData}
              staticTableData={stage1}
              continueToNextStage={continueToNextStage}
              pathName={pathName}
              asPath={router.asPath}
            />
            <MobileView
              tableData={tableData}
              staticTableData={stage1}
              continueToNextStage={continueToNextStage}
              pathName={pathName}
              asPath={router.asPath}
            />
            <StyledMoreOptionsCont>
              {subStage < 2 && (
                <FelaComponent
                  style={theme => ({
                    marginTop: '2rem',
                    fontWeight: '700',
                    extend: [ theme.type(-1), ],
                  })}
                  render="p"
                >
                  <Link
                    href={entitlements.link}
                    content={
                      <Fragment>
                        {entitlements.beforeLinkText}{' '}
                        <FelaComponent
                          render="span"
                          style={{
                            textDecoration: 'underline',
                            textDecorationSkip: 'ink',
                          }}
                        >
                          {entitlements.linkText}
                        </FelaComponent>
                      </Fragment>
                    }
                  />
                </FelaComponent>
              )}
              <FelaComponent
                style={theme => ({
                  marginTop: '2rem',
                  extend: [ theme.type(-1), ],
                })}
              >
                <Link
                  href={organizationSubscription.url}
                  content={
                    <FelaComponent
                      render="span"
                      style={{
                        textDecoration: 'underline',
                        textDecorationSkip: 'ink',
                      }}
                    >
                      {organizationSubscription.text}
                    </FelaComponent>
                  }
                />
              </FelaComponent>
            </StyledMoreOptionsCont>
          </div>
        </Fragment>
      )}
    />
  );
}

ChooseSlotStage.propTypes = propTypes;
ChooseSlotStage.defaultProps = defaultProps;

export default withRouter(ChooseSlotStage);
