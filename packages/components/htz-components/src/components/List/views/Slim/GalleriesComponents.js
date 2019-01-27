// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import ImageGallery, { CaptionElement, } from '../../../ImageGallery/ImageGallery';
import GridItem from '../../../Grid/GridItem';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import Image from '../../../Image/Image';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import IconCamera from '../../../Icon/icons/IconCamera';
import { isGallery, } from '../../../../utils/validateType';

type MainGalleryProps = {
  item: TeaserDataType,
};

type MobileGalleryTeaserProps = MainGalleryProps & {
  biAction: ?ListBiActionType,
};

type RelatedGalleryProps = MobileGalleryTeaserProps & {
  miscStyles?: ?StyleProps,
};

export function MainGallery({ item, }: MainGalleryProps): Node {
  if (item.media && isGallery(item.media)) {
    return (
      <ImageGallery
        forceAspect="headline"
        {...item.media}
        renderCaption={({
          previousImage,
          image,
          nextImage,
          displayItemNum,
          previousItemIndex,
          nextItemIndex,
          direction,
          moving,
          animationDuration,
          itemsLength,
        }) => {
          const getCaptionProps = (imageObj, index) => ({
            animationDuration,
            caption: imageObj.title,
            credit: imageObj.credit,
            direction,
            index,
            itemsLength,
            moving,
            size: -1,
            creditSize: -1,
            prefixContent: `${index + 1}/${itemsLength}`,
            wrapperMiscStyles: {
              paddingInlineEnd: [
                { from: 's', until: 'xl', value: '4rem', },
                { from: 'xl', value: '0rem', },
              ],
              paddingInlineStart: [
                { from: 's', until: 'xl', value: '4rem', },
                { from: 'xl', value: '0rem', },
              ],
              flexShrink: '0',
            },
            captionMiscStyles: {
              flexGrow: '1',
              // justifyContent: 'space-between',
              paddingStart: '0',
            },
          });
          return (
            <FelaComponent
              style={theme => ({
                backgroundColor: theme.color('neutral'),
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                paddingBottom: '5rem',
              })}
            >
              <CaptionElement
                position={100}
                {...getCaptionProps(previousImage, previousItemIndex)}
              />
              <CaptionElement position={0} {...getCaptionProps(image, displayItemNum)} />
              <CaptionElement position={-100} {...getCaptionProps(nextImage, nextItemIndex)} />
            </FelaComponent>
          );
        }}
      />
    );
  }
  return null;
}

// eslint-disable-next-line operator-linebreak
export function RelatedGallery({ item, miscStyles, biAction, }: RelatedGalleryProps): Node {
  return (
    <GridItem
      gutter={4}
      width={[
        { until: 'l', value: 1 / 2, },
        { from: 'l', until: 'xl', value: 1 / 3, },
        { from: 'xl', value: 1, },
      ]}
      miscStyles={{
        marginBottom: [ { from: 'xl', value: '4rem', }, ],
        ...(miscStyles || {}),
      }}
    >
      <Teaser
        data={item}
        gutter={2}
        isRev={false}
        backgroundColor={[ 'transparent', ]}
        onClick={biAction ? () => biAction({ index: 0, articleId: item.contentId, }) : null}
      >
        <TeaserMedia
          data={item}
          width={[
            { until: 's', value: 20, },
            { from: 's', until: 'xl', value: 2 / 4, },
            { from: 'xl', value: 1, },
          ]}
        >
          <Image
            data={item.image}
            imgOptions={{
              transforms: {
                width: '285',
                aspect: 'headline',
                quality: 'auto',
              },
            }}
          />
        </TeaserMedia>
        <TeaserContent
          data={item}
          padding={[
            { until: 's', value: [ 0.5, 0, 4, 1, ], },
            { from: 's', until: 'xl', value: 0, },
            { from: 'xl', value: [ 2, 0, ], },
          ]}
          backgroundColor={[ 'transparent', ]}
          color={[ 'neutral', '-10', ]}
          renderContent={() => (
            <TeaserHeader
              {...item}
              typeScale={[ { until: 'xl', value: 0, }, { from: 'xl', value: -1, }, ]}
              miscStyles={{
                paddingBottom: '4rem',
              }}
            />
          )}
        />
      </Teaser>
    </GridItem>
  );
}

type State = {
  showGallery: boolean,
};

export class MobileGalleryTeaser extends React.Component<MobileGalleryTeaserProps, State> {
  state = {
    showGallery: false,
  };

  render() {
    const { item, biAction, } = this.props;
    const { showGallery, } = this.state;
    return item.media && isGallery(item.media) ? (
      !showGallery ? (
        <FelaTheme
          render={theme => (
            <Teaser
              data={item}
              gutter={2}
              isRev={false}
              backgroundColor={[ 'neutral', ]}
              onClick={event => {
                if (biAction) biAction({ index: 0, articleId: item.contentId, actionCode: 128, });
                event.preventDefault();
                this.setState({
                  showGallery: true,
                });
              }}
              miscStyles={{
                display: [ { from: 's', value: 'none', }, ],
              }}
            >
              <TeaserMedia
                data={item}
                width={1}
                onClick={
                  biAction
                    ? () => biAction({ index: 0, articleId: item.contentId, actionCode: 128, })
                    : null
                }
              >
                {item.media && isGallery(item.media) && item.media.images ? (
                  <Image
                    data={item.media.images[0]}
                    imgOptions={{
                      transforms: {
                        width: '560',
                        aspect: 'headline',
                        quality: 'auto',
                      },
                    }}
                  />
                ) : null}
              </TeaserMedia>
              <TeaserContent
                data={item}
                padding={[ 4, 2, 0, ]}
                color={[ 'neutral', '-10', ]}
                miscStyles={{
                  position: 'relative',
                  overflow: 'visible',
                }}
                footerPadding={[ 0, 2, 2, ]}
                footerColor={[ 'quaternary', ]}
                footerMiscStyles={{
                  ...theme.type(-2),
                  textAlign: 'center',
                }}
                renderContent={() => (
                  <Fragment>
                    <FelaComponent
                      style={{
                        position: 'absolute',
                        top: '0',
                        start: '50%',
                        backgroundColor: theme.color('quaternary'),
                        paddingStart: '1.5rem',
                        paddingEnd: '1.5rem',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                        borderRadius: '50%',
                        transform: 'translate(50%, -50%)',
                        zIndex: 6,
                      }}
                    >
                      <IconCamera color={[ 'neutral', ]} size={4} />
                    </FelaComponent>
                    <TeaserHeader
                      {...item}
                      typeScale={-1}
                      isCentered
                      onClick={
                        biAction
                          ? () => biAction({ index: 0, articleId: item.contentId, actionCode: 128, })
                          : null
                      }
                    />
                  </Fragment>
                )}
                renderFooter={() => (item.media && isGallery(item.media) && item.media.images
                  ? theme.galleryI18n.mobileList(item.media.images.length)
                  : null)
                }
              />
            </Teaser>
          )}
        />
      ) : (
        <ImageGallery
          forceAspect="headline"
          fullScreenOnly
          exitFullScreenAction={() => this.setState({
            showGallery: false,
          })
          }
          {...item.media}
        />
      )
    ) : null;
  }
}
