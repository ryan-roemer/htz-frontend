// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ImageDataType, } from '../../flowTypes/ImageDataType';

import Image from '../Image/Image';
import HtzLink from '../HtzLink/HtzLink';
import Button from '../Button/Button';
import Section from '../AutoLevels/Section';
import H from '../AutoLevels/H';
import getImageAssets from '../../utils/getImageAssets';
import Paragraph from '../Paragraph/Paragraph';
import IconBack from '../Icon/icons/IconBack';

type PromotedContentProperties = {
  bottomText: Array<Object>,
  sideText: Array<Object>,
  contentType: string,
  title: string,
  image?: ImageDataType,
  link?: string,
};

type PromotedArticleContentType = {
  properties: PromotedContentProperties,
};

const textWrapper = theme => ({
  paddingInlineStart: '2rem',
  paddingInlineEnd: '2rem',
  paddingBlockStart: '2rem',
  paddingBlockEnd: '1rem',
  extend: [
    theme.mq(
      { from: 's', },
      {
        paddingInlineStart: '3rem',
        paddingInlineEnd: '4rem',
        paddingBlockStart: '2rem',
        paddingBlockEnd: '1rem',
      }
    ),
  ],
});

const titleStyle = theme => ({
  marginBlockEnd: '1rem',
  ...theme.type(2),
  extend: [
    theme.mq(
      { from: 's', },
      {
        marginBlockStart: '1rem',
      }
    ),
    theme.mq(
      { from: 'l', },
      {
        ...theme.type(1),
      }
    ),
  ],
});
const sideTextStyle = theme => ({
  ...theme.type(-1),
});
const bottomTextStyle = ({ showText, theme, }) => ({
  display: showText ? 'block' : 'none',
});
const expansibleStyle = ({ theme, showExpansibleButton, }) => ({
  display: showExpansibleButton ? 'none' : 'block',
});

function PromotedArticleContent({ properties, }: PromotedArticleContentType): React.Node {
  const [ isOpen, showBottomText, ] = React.useState(0);
  return (
    <Section>
      <FelaComponent
        style={theme => ({
          backgroundColor: theme.color('neutral', '-7'),
          marginBlockEnd: '3rem',
        })}
        render={({ theme, className, }) => (
          <div className={className}>
            {/* Image Component  */}
            <HtzLink href={properties.link}>
              <Image
                data={properties.image}
                imgOptions={getImageAssets({
                  bps: theme.bps,
                  aspect: 'landscape',
                  sizes: [
                    { from: 'l', size: '650px', },
                    { from: 'm', until: 'l', size: '450px', },
                    { from: 's', until: 'm', size: '400px', },
                    { until: 's', size: '300px', },
                    { size: 'calc(100vw - 24px)', },
                  ],
                  widths: [ 200, 300, 400, 445, 640, ],
                })}
              />
            </HtzLink>
            <FelaComponent style={textWrapper}>
              {/* Side Box */}
              <FelaComponent style={titleStyle}>
                <H>{properties.title}</H>
              </FelaComponent>
              {properties.sideText.map(value => (
                <Paragraph
                  {...value}
                  miscStyles={{
                    ...theme.type(0, { untilBp: 'xl', lines: 5, }),
                    ...theme.type(-1, { fromBp: 'xl', lines: 5, }),
                  }}
                />
              ))}
              {/* Bottom Text Component */}
              <FelaComponent>
                {/* Expansible additional information */}
                <FelaComponent showExpansibleButton={isOpen} rule={expansibleStyle} render="span">
                  <Button
                    variant="neutral"
                    isFlat
                    onClick={() => {
                      showBottomText(!isOpen);
                    }}
                    boxModel={{ hp: 0.5, vp: 0.5, }}
                  >
                    <span>{theme.marketingTools.Weekly.buttonText}</span>
                    <IconBack
                      miscStyles={{
                        transform: 'rotate(270deg)',
                        marginInlineStart: '1rem',
                      }}
                    />
                  </Button>
                </FelaComponent>
                <FelaComponent showText={isOpen} rule={bottomTextStyle}>
                  {properties.bottomText.map(value => (
                    <Paragraph
                      {...value}
                      miscStyles={{
                        ...theme.type(0, { untilBp: 'xl', lines: 5, }),
                        ...theme.type(-1, { fromBp: 'xl', lines: 5, }),
                      }}
                    />
                  ))}
                </FelaComponent>
              </FelaComponent>
              {/* Bottom text component End */}
            </FelaComponent>
            {/* Promoted content type */}
            <FelaComponent
              style={theme => ({
                textAlign: 'left',
                paddingBlockEnd: '2rem',
                paddingInlineEnd: '2rem',
                color: theme.color('commercial'),
                fontWeight: '700',
                ...theme.type(-2),
                extend: [
                  theme.mq({ from: 's', }, { paddingInlineEnd: '3rem', }),
                  theme.mq({ until: 'xl', }, { ...theme.type(-1), }),
                ],
              })}
            >
              {properties.contentType}
            </FelaComponent>
          </div>
        )}
      />
    </Section>
  );
}

PromotedArticleContent.defaultProps = {
  image: null,
  link: '/',
};

export default PromotedArticleContent;
