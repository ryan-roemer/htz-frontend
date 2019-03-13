import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { borderBottom, borderTop, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Image from '../../../Image/Image';
import Caption from '../../../Caption/Caption';
import Rating from '../../../Rating/Rating';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import TextLink from '../../../TextLink/TextLink';

// //////////////////////////////////////////////////////////////////////
//                          Item Style                                 //
// //////////////////////////////////////////////////////////////////////
const itemStyle = ({ theme, displayBorderInMBreak, itemBorderTop, }) => ({
  marginTop: '1rem',
  marginBottom: '1rem',
  extend: [
    theme.mq(
      { from: 'l', },
      {
        ...borderBottom({
          width: '1px',
          lines: 1.5,
          style: 'solid',
          color: theme.color('neutral', '-5'),
        }),
      }
    ),
    itemBorderTop
      ? theme.mq(
        { from: 'l', },
        {
          ...borderTop({
            width: '1px',
            lines: 1.5,
            style: 'solid',
            color: theme.color('neutral', '-5'),
          }),
        }
      )
      : {},
    displayBorderInMBreak
      ? theme.mq(
        { from: 'm', until: 'l', },
        {
          ...borderBottom({
            width: '1px',
            lines: 2,
            style: 'solid',
            color: theme.color('neutral', '-5'),
          }),
        }
      )
      : {},
    theme.mq(
      { until: 'm', },
      {
        ...borderBottom({
          width: '1px',
          lines: 2,
          style: 'solid',
          color: theme.color('neutral', '-5'),
        }),
      }
    ),
    theme.type(-1),
  ],
});

// //////////////////////////////////////////////////////////////////////
//                          Helper Components                          //
// //////////////////////////////////////////////////////////////////////

const CaptionElementPropTypes = {
  credit: PropTypes.string,
  title: PropTypes.string,
};
const CaptionElementDefaultProps = {
  credit: null,
  title: null,
};

const CaptionElement = ({ credit, title, }) => (
  <FelaComponent
    style={{
      display: 'flex',
      marginBottom: '3rem',
      textAlign: 'start',
    }}
    render={({ className, theme, }) => (
      <div className={className}>
        <Caption caption={title} credit={credit} color={[ 'neutral', ]} typeStyles={-2} floatCredit />
      </div>
    )}
  />
);

CaptionElement.propTypes = CaptionElementPropTypes;
CaptionElement.defaultProps = CaptionElementDefaultProps;

const ImageElementPropTypes = {
  imageData: PropTypes.shape({}),
  // hide the id image from display at restaurant review.
  imgIsHidden: PropTypes.bool,
};
const ImageElementDefaultProps = {
  imgIsHidden: false,
  imageData: null,
};

const ImageElement = ({ imageData, imgIsHidden, }) => {
  if (!imageData) return null;
  const { credit, title, ...imgData } = imageData;
  const imgOptions = {
    transforms: {
      width: 122,
      height: 186,
      aspect: 'regular',
      quality: 'auto',
    },
  };
  return (
    <FelaComponent
      style={theme => ({
        ...(imgIsHidden && { display: 'none', }),
        paddingTop: '5rem',
        maxWidth: '17.5rem',
        extend: [
          theme.mq(
            { from: 'l', },
            {
              paddingTop: '8rem',
            }
          ),
          theme.mq(
            { from: 's', until: 'm', },
            {
              display: 'none',
            }
          ),
          theme.mq(
            { until: 's', },
            {
              maxWidth: '25rem',
              margin: 'auto',
            }
          ),
        ],
      })}
      render={({ className, theme, }) => (
        <div className={className}>
          <Image
            data={imgData}
            imgOptions={imgOptions}
            miscStyles={{ paddingBottom: '152%', marginInlineStart: '-1rem', }}
          />
          <CaptionElement credit={credit} />
        </div>
      )}
    />
  );
};

ImageElement.propTypes = ImageElementPropTypes;
ImageElement.defaultProps = ImageElementDefaultProps;

// //////////////////////////////////////////////////////////////////////
//                            Main Component                           //
// //////////////////////////////////////////////////////////////////////

const propTypes = {
  // amenities items from polopoly.
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      // Amenity Object key.
      key: PropTypes.string,
      // Amenity object label.
      label: PropTypes.string,
      // Amenity object value.
      value: PropTypes.string,
      // Amenity type.
      type: PropTypes.oneOf([ 'link', 'string', 'strong', ]),
      // determine if the item should be shown in this display.
      display: PropTypes.bool,
    })
  ).isRequired,
  // image object from polopoly
  reviewImgData: PropTypes.shape({}),
  // Review stars float
  reviewStars: PropTypes.number,
  // review article type from polopoly.
  reviewType: PropTypes.oneOf([ 'book', 'movie', 'restaurant', ]),
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};
const defaultProps = {
  reviewImgData: null,
  reviewStars: -1,
  reviewType: null,
  miscStyles: null,
};

function ReviewAmenities({ amenities, reviewImgData, reviewStars, reviewType, miscStyles, }) {
  // some amenities passed for internal data use and not for display.
  const displayedAmenities = amenities.filter(value => value.display && value.value);

  // check amenities count to determine style in medium break.
  const isEvenAmenities = displayedAmenities.length % 2 === 0;

  // check if the amenity id image should be visible. Hide if false.
  const displayImg = reviewType !== 'restaurant' && reviewImgData;

  return (
    <Grid miscStyles={miscStyles}>
      <FelaComponent
        render={({ className, theme, }) => (
          <GridItem
            width={1}
            miscStyles={{
              backgroundColor: [ { until: 'm', value: 'white', }, ],
              // todo: ask if borderBottm/borderTop function accepts media queries.
              ...theme.mq(
                { from: 'm', until: 'l', },
                {
                  ...borderBottom('7px', 2, 'solid', theme.color('primary', '-5')),
                  ...borderTop('7px', 2, 'solid', theme.color('primary', '-5')),
                }
              ),
            }}
          >
            <Grid
              miscStyles={{
                paddingInlineEnd: [
                  { from: 'xl', value: '7rem', },
                  { from: 'l', until: 'xl', value: '2rem', },
                  { from: 'm', until: 'l', value: '10rem', },
                ],
                paddingInlineStart: [
                  { from: 'xl', value: '2rem', },
                  { from: 'l', until: 'xl', value: '2rem', },
                  { from: 'm', until: 'l', value: '10rem', },
                ],
                padding: [ { until: 'm', value: '2rem', }, ],
                alignItems: 'center',
              }}
            >
              <GridItem
                width={[
                  { until: 'm', value: 1, },
                  { from: 'm', until: 'l', value: 1 / 4, },
                  { from: 'l', value: 1, },
                ]}
                miscStyles={{
                  order: [ { until: 'm', value: 1, }, ],
                }}
              >
                <ImageElement imageData={reviewImgData} imgIsHidden={!displayImg} />
              </GridItem>
              <GridItem
                width={[
                  { until: 'm', value: 1, },
                  {
                    from: 'm',
                    until: 'l',
                    value: displayImg ? 3 / 4 : 1,
                  },
                  { from: 'l', value: 1, },
                ]}
                miscStyles={{
                  ...(!displayImg
                    ? {
                      marginTop: [
                        { from: 'l', value: '5rem', },
                        { from: 'm', until: 'l', value: '3rem', },
                      ],
                      marginBottom: [ { from: 'm', until: 'l', value: '3rem', }, ],
                      marginInlineStart: [ { from: 'm', until: 'l', value: 'auto', }, ],
                      marginInlineEnd: [ { from: 'm', until: 'l', value: 'auto', }, ],
                      maxWidth: [
                        {
                          from: 'm',
                          until: 'l',
                          value: theme.articleStyle.body.maxWidth,
                        },
                      ],
                    }
                    : {}),
                }}
              >
                <Grid tagName="ul" gutter={0}>
                  {displayedAmenities.map((amenity, i) => (
                    <GridItem
                      tagName="li"
                      key={`${amenity.key}-${i}`}
                      width={[
                        { until: 'm', value: 1, },
                        { from: 'm', until: 'l', value: 1 / 2, },
                        { from: 'l', value: 1, },
                      ]}
                    >
                      <FelaComponent
                        displayBorderInMBreak={
                          isEvenAmenities
                          || (!isEvenAmenities && displayedAmenities.length !== i + 1)
                        }
                        itemBorderTop={i === 0}
                        rule={itemStyle}
                        render={({ className, }) => (
                          <div className={className}>
                            {amenity.type === 'link' ? (
                              <TextLink
                                href={amenity.value}
                                content={amenity.label}
                                miscStyles={{
                                  fontWeight: [ { from: 'm', until: 'l', value: 'bold', }, ],
                                }}
                              />
                            ) : (
                              <Fragment>
                                <FelaComponent
                                  style={{
                                    fontWeight: 'bold',
                                  }}
                                  render={({ className, }) => (
                                    <span className={className}>{`${amenity.label}: `}</span>
                                  )}
                                />
                                {amenity.url ? (
                                  <TextLink
                                    href={amenity.url}
                                    content={amenity.value}
                                    miscStyles={
                                      amenity.type === 'strong'
                                        ? {
                                          ...theme.mq({ from: 'l', }, { display: 'inline-block', }),
                                        }
                                        : {}
                                    }
                                  />
                                ) : (
                                  <FelaComponent
                                    style={{
                                      extend: [
                                        amenity.type === 'strong'
                                          && theme.mq({ from: 'l', }, { display: 'inline-block', }),
                                      ],
                                    }}
                                    render={({ className, }) => (
                                      <span className={className}>{amenity.value}</span>
                                    )}
                                  />
                                )}
                              </Fragment>
                            )}
                          </div>
                        )}
                      />
                    </GridItem>
                  ))}
                  {reviewStars > -1 && typeof reviewStars === 'number' ? (
                    <GridItem
                      tagName="li"
                      width={[
                        { until: 'm', value: 1, },
                        { from: 'm', until: 'l', value: 1 / 2, },
                        { from: 'l', value: 1, },
                      ]}
                    >
                      <FelaComponent
                        displayBorderInMBreak={false}
                        rule={itemStyle}
                        render={({ className, theme, }) => (
                          <div className={className}>
                            <FelaComponent
                              style={{ fontWeight: 'bold', }}
                              render={({ className, }) => (
                                <span className={className}>
                                  {`${theme.reviewRatingI18n.ratingTitle}: `}
                                </span>
                              )}
                            />
                            <Rating rating={reviewStars} disabled />
                          </div>
                        )}
                      />
                    </GridItem>
                  ) : null}
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
        )}
      />
    </Grid>
  );
}

ReviewAmenities.propTypes = propTypes;
ReviewAmenities.defaultProps = defaultProps;

export default ReviewAmenities;
