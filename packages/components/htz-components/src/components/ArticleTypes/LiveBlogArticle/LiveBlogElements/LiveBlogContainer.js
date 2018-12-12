import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { border, borderTop, borderBottom, parseStyleProps } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Time from '../../../Time/Time';
import ActionButtons from '../../../ActionButtons/ActionButtons';
import RadioButton from '../../../RadioButton/RadioButton';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';

import TimeLine from './TimeLine';
import ArticleBody from '../../../ArticleBody/ArticleBody';


const wrapperStyle = ({ miscStyles, theme, }) => ({
  display: 'block',
  width: '100%',
  
  extend: [
    theme.mq(
      { from: 's', until: 'l', },
      { 
        paddingInlineStart: '4rem',
        paddingInlineEnd: '4rem',
        paddingBottom: '4rem',
      },
    ), 
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

// const itemContainerStyle = ({ theme, }) => ({
//   //   width: '100%',
//   // extend: [
//   //   border('2px', 1, 'solid', 'gray'),
//   // ],
// });

// function SortUpdates({ value, changeState, }) {
//   return (
//     <Fragment>
//         <FelaComponent
//             style={ theme => ({ backgroundColor:  theme.color('primary', '-6'), width: '100%', display: 'flex', justifyContent: 'space-between', })}
//             render={({ className, theme, }) => (
//               <div className={className}>
//                 <FelaComponent
//                   style={{}}
//                   render={({ className, })=> (
//                     <span>{theme.liveBlogI18n.updatesTitle}</span>
//                   )}
//                 />
//                 <FelaComponent
//                   style={{ display: 'flex', }}
//                   render={({ className, })=> (

//                   )}
//                 />
//               <div>
//             )}
//         />
//     </Fragment>
//   );
// }

class LiveBlogContainer extends React.Component {
  static propTypes = {
    liveblogItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    timeLineItems: PropTypes.arrayOf(
      PropTypes.shape({
        keyEvent: PropTypes.string,
        pubDate: PropTypes.instanceOf(Date).isRequired,
        contentId: PropTypes.string,
      })
    ),
    showTimeLineText: PropTypes.bool,
    /**
     * A special property holding miscellaneous CSS values that
     * trumps all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
    */
    miscStyles: stylesPropType,
  };  
  static defaultProps = {
    showTimeLineText: false,
    timeLineItems: null,
    miscStyles: null,
  }

  state = {
    value: 'descending',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.value === 'descending') {
      return { items: props.liveblogItems, };
    }
    return { items: props.liveblogItems.slice().reverse(), };
  }

  render() {
    const { items, } = this.state;
    const { canonicalUrl, timeLineItems, showTimeLineText, miscStyles, } = this.props;
    console.warn('items: ', typeof items, items);
    return (
      <Fragment>
        {/* Wrapper */}
        <FelaComponent
        rule={wrapperStyle}
        miscStyles={miscStyles}
        render={({ className, theme, })=> (
          <div className={className}>
          <TimeLine
            showTimeLineText={showTimeLineText}
            timeLineItems={timeLineItems}
            miscStyles={{
              ...theme.mq(
                { from: 'l', },
                { display: 'none', }
              ),
              ...theme.mq(
                { from: 's', until: 'l', },
                {
                  marginInlineStart: '6rem',
                  paddingTop: '3rem',
                  // display: 'block',

                //  padding: '2rem',
                //  marginTop: '2rem',
                //  paddingBottom: '1rem',
                //  backgroundColor: theme.color('primary', '-5'),
               }
              ),
            }}
          />
          {/* UpdateComponent */}
          <FelaComponent
                style={theme => ({
                  // backgroundColor: theme.color('primary', '-6'),
                  backgroundColor: 'white',
                  // width: '100%',
                  display: 'block',
                  paddingBottom: '4rem',
                  paddingTop: '4rem',
                  ...theme.mq({ until: 's', }, {  paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }),
                  ...theme.mq(
                    { from: 's', until: 'l', },
                    { 
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginInlineStart: '4rem',
                      marginInlineEnd: '4rem',
                      // padding: '4rem',
                      paddingInlineStart: '4rem',
                      paddingInlineEnd: '4rem',
                      alignItems: 'center',
                      ...borderTop({ width: '13px', lines: 6, style: 'solid', color: theme.color('neutral', '-6'), }),
                    }
                  ),
                  ...theme.mq({ from: 'l', }, {
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingInlineStart: '4rem',
                    paddingInlineEnd: '4rem',
                    alignItems: 'center',
                    // ...border({ width: '11px', lines: 5, style: 'solid', color: theme.color('neutral', '-6'), }),
                    ...borderTop({ width: '13px', lines: 6, style: 'solid', color: 'red', }),
                    // ...borderBottom({ width: '11px', lines: 5, style: 'solid', color: theme.color('neutral', '-6'), }),
                   }, ),
                // }),
                //   justifyContent: 'space-between',
                })}
                render={({ className, theme, }) => (
                  <div className={className}>
                    <FelaComponent
                      style={theme => (
                        { 
                          color: theme.color('tertiary'),
                          fontWeight: 'bold',
                          ...theme.mq({ until: 's', }, { marginBottom: '3rem'}),
                          ...theme.type(3),
                        }
                      )}
                      render={({ className, }) => <div className={className}>{theme.liveBlogI18n.updatesTitle}</div>}
                    />
                    <FelaComponent
                      style={{ display: 'flex', paddinTop: '1rem', justifyContent: 'center', }}
                      render={({ className, }) => (
                        <div className={className}>
                          <RadioButton
                            label={theme.liveBlogI18n.lastToFirstLabel}
                            value="descending"
                            onChange={evt => this.setState({ value: evt.target.value, })}
                            checked={this.state.value === 'descending'}
                            miscStyles={{ marginInlineEnd: '5rem', ...theme.type(-1), }}
                          />
                          <RadioButton
                            label={theme.liveBlogI18n.firstToLastLabel}
                            value="ascending"
                            onChange={evt => this.setState({ value: evt.target.value, })}
                            checked={this.state.value === 'ascending '}
                            miscStyles={{ ...theme.type(-1), }}
                          />
                        </div>
                      )}
                    />
                  </div>
                )}
              />
          {/* <FelaComponent
            style={theme => ({
              backgroundColor: theme.color('primary', '-6'),
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            })}
            render={({ className, theme, }) => (
              <div className={className}>
                <FelaComponent
                  style={{ color: 'red', }}
                  render={({ className, }) => <span>{theme.liveBlogI18n.updatesTitle}</span>}
                />
                <FelaComponent
                  style={{ display: 'flex', }}
                  render={({ className, }) => (
                    <div className={className}>
                      <RadioButton
                        label={theme.liveBlogI18n.lastToFirstLabel}
                        value="descending"
                        onChange={evt => this.setState({ value: evt.target.value, })}
                        checked={this.state.value === 'descending'}
                        miscStyles={{ marginInlineEnd: '5rem', ...theme.type(-1), }}
                      />
                      <RadioButton
                        label={theme.liveBlogI18n.firstToLastLabel}
                        value="ascending "
                        onChange={evt => this.setState({ value: evt.target.value, })}
                        checked={this.state.value === 'ascending '}
                        miscStyles={{ ...theme.type(-1), }}
                      />
                    </div>
                  )}
                />
              </div>
            )}
          /> */}
          {/* UpdateComponent End */}
          <FelaComponent
            rule={wrapperStyle}
            render={({ className, theme, }) => (
              <div className={className}>
                {items.map((item, i) => (
                  <Grid
                    tagName="article"
                    attrs={{ itemid: `${canonicalUrl}#${item.contentId}`, }}
                    id={item.contentId}
                    miscStyles={{
                      marginBottom: '2rem', 
                      marginTop: '2rem',
                      backgroundColor: 'white',
                      marginInlineEnd: 'auto',
                      marginInlineStart: 'auto',
                      border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
                      // ...theme.mq({ from: 'm', }, { marginInlineEnd: 'auto', marginInlineStart: 'auto', }, ),
                    }}
                  >
                  {/* Time and share bar */}
                    <GridItem 
                      width={[{ until: 's', value: 1 / 1, }, { from: 's', value: 1 / 5, }]}
                      miscStyles={{ paddingTop: '3rem', ...theme.mq({ until: 's', }, { display: 'inline-flex', alignItems: 'baseline', }), }}
                    >
                      <FelaComponent
                        style={theme => ({
                          // ...theme.type(0),
                          fontWeight: 'bold',
                          ...theme.mq({ until: 's', }, { marginInlineEnd: '1rem', color: theme.color('tertiary'), ...theme.type(-2)}),
                          // paddingTop: '3rem',
                        })}
                        render={({ className, }) => (
                          <div className={className}>
                            <Time time={item.pubDate} format="HH:mm" />
                          </div>
                        )}
                      />
                      <FelaComponent
                        style={theme => ({
                          ...theme.type(-3),
                          ...theme.mq({ until: 's', }, { marginInlineEnd: '1rem', ...theme.type(-2)}),
                        })}
                        render={({ className, }) => (
                          <div className={className}>
                            <Time time={item.pubDate} format="DD.MM.YYYY" />
                          </div>
                        )}
                      />
                      <ActionButtons
                        miscStyles={{
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginTop: '5rem',
                          ...theme.mq({ until: 's', }, { display: 'none', }),
                        }}
                        size={3}
                        buttons={[
                          {
                            name: 'facebookLogo',
                            buttonText: 78,
                            iconStyles: {
                              color: theme.color('primary'),
                            },
                          },
                          {
                            name: 'whatsapp',
                            iconStyles: {
                              color: theme.color('primary'),
                            },
                          },
                          {
                            name: 'mail',
                            iconStyles: {
                              color: theme.color('primary'),
                            },
                          },
                        ]}
                        vertical
                      />
                    </GridItem>
                    <GridItem
                      // width={3 / 4}
                      width={[ { until: 's', value: 1 / 1, }, { from: 's', value: 4 / 5, }, ]}
                      miscStyles={{
                        paddingTop: '3rem',
                        paddingBottom: '4rem',
                        paddingInlineEnd: '6rem',
                        maxWidth: '70rem',
                        // width: '100%',
                        ...theme.mq({ until: 's', }, { width: '100%', }),
                      }}
                    >
                      {/* <div style={{ fontWeight: 'bold', }}>{item.title}</div> */}
                      <a href={`#${item.contentId}`}>
                        <h1>{item.title}</h1>
                      </a>
                      <ArticleBody body={item.body} showSurvey={false} />
                    </GridItem>

                  </Grid>
                ))}
              </div>
            )}
          />
        </div>
        )} 
        />
      </Fragment>
    );
  }
}

export default LiveBlogContainer;
