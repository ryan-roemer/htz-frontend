import React, { Fragment, } from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import IconTheMarker from '../Icons/IconTheMarker';
import IconAlefLogoTransparent from '../Icons/IconAlefLogoTransparent';

// eslint-disable-next-line react/prop-types
function Item({ title, value, children, miscStyles, }) {
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            flexBasis: 'auto',
            flexShrink: '1',
            flexGrow: '1',
            display: 'flex',
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            extend: [
              ...(miscStyles
                ? parseStyleProps(miscStyles, theme.mq, theme.type)
                : []),
            ],
          }}
        >
          {
            children || (
              <Fragment>
                <FelaComponent
                  style={{
                    backgroundColor: theme.color('neutral', '-10'),
                    flex: '1',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...theme.type(2),
                  }}
                >
                  {title}
                </FelaComponent>
                <FelaComponent
                  style={{
                    backgroundColor: theme.color('neutral', '-10'),
                    flex: '1',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...theme.type(3),
                  }}
                >
                  {value}
                </FelaComponent>
              </Fragment>
            )
          }
        </FelaComponent>
      )}
    />
  );
}

// eslint-disable-next-line react/prop-types
function Logo({ subscription, }) {
  const Icon = subscription === 'tm' ? IconTheMarker : IconAlefLogoTransparent;
  return (
    <FelaComponent
      style={theme => ({
        color: theme.logoColors(subscription),
      })}
    >
      <Icon size={8} />
    </FelaComponent>
  );
}

// eslint-disable-next-line react/prop-types
function Subscription({ data, subscription, }) {
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            backgroundColor: theme.color('site', subscription),
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            ...parseComponentProp(
              'height',
              [
                { misc: 'landscape', value: '100vh', },
                { misc: 'portrait', value: '50vh', },
              ],
              theme.mq,
              (prop, value) => ({ [prop]: value, })
            ),
          }}
        >
          <Item miscStyles={{ flexGrow: '0', }}><Logo subscription={subscription} /></Item>
          <Item title="מנויים חדשים היום" value={data.newUsers} />
          <Item title='סה"כ מנויים משלמים' value={data.totalPaying} />
          <Item title="% מהמנויים שקראו היום" value={data.todayReaders.paying} />
          <Item title="% מהרשומים שקראו היום" value={data.todayReaders.registered} />
          <Item title="ביטלו אתמול" value={data.cancellations} />
        </FelaComponent>
      )}
    />
  );
}

export default Subscription;
