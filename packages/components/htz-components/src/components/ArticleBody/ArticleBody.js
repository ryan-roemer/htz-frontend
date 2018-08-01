import React from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../utils/componentFromInputTemplate';
import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import UserSurvey from '../UserSurvey/UserSurvey';

const propTypes = {
  /**
   * The elements composing the article’s body.
   */
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
};

const defaultProps = {};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

// eslint-disable-next-line react/prop-types
const Figure = ({ lastItem, children, }) => (
  <FelaComponent
    style={theme =>
      (!lastItem
        ? {
            ...parseComponentProp(
              'marginBottom',
              theme.articleStyle.body.marginBottom,
              theme.mq,
              mediaQueryCallback
            ),
          }
        : {})
    }
    render="figure"
  >
    {children}
  </FelaComponent>
);

// eslint-disable-next-line react/prop-types
const Aside = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      ...theme.mq(
        { from: 'l', },
        {
          width: '26rem',
          position: 'absolute',
          textAlign: 'start',
          start: theme.layoutStyle.startColumnPadding,
        }
      ),
      extend: [
        ...[
          parseComponentProp(
            'marginBottom',
            theme.articleStyle.body.marginBottom,
            theme.mq,
            mediaQueryCallback
          ),
        ],
      ],
    })}
    render="aside"
  >
    {children}
  </FelaComponent>
);

const buildComponent = (context, index, isLastItem) => {
  const uniqueId =
    context.elementType || context.inputTemplate || context.tag || null;
  const Component =
    uniqueId === 'com.tm.Image' ? ArticleImage : getComponent(uniqueId);

  switch (uniqueId) {
    case 'com.tm.Image':
      return <Component key={index} lastItem={isLastItem} {...context} />;
    case 'embedElement':
      return (
        <Figure key={index} lastItem={isLastItem}>
          <Component {...context} />
        </Figure>
      );
    case 'interactiveElement':
    case 'com.tm.ImageGalleryElement':
    case 'com.tm.Video': // eslint-disable-line no-case-declarations
      return (
        <Figure key={index} lastItem={isLastItem}>
          <Component {...context} />
          {(context.title || context.caption || context.credit) && (
            <Caption
              caption={context.title || context.caption}
              credit={context.credit}
            />
          )}
        </Figure>
      );
    case 'com.htz.MagazineArticleQuote':
      return (
        <Aside key={index}>
          <Component {...context} />
        </Aside>
      );
    case 'com.polobase.DfpBannerElement':
      return <Component {...context} {...context.properties} />;
    default:
      return (
        <FelaTheme
          render={theme => (
            <Component
              key={index}
              {...context}
              miscStyles={
                isLastItem
                  ? null
                  : parseComponentProp(
                      'marginBottom',
                      theme.articleStyle.body.marginBottom,
                      theme.mq,
                      mediaQueryCallback
                    )
              }
              renderFirstImpression={!isLastItem}
            />
          )}
        />
      );
  }
};

function ArticleBody({ body, }) {
  return (
    <FelaComponent
      style={theme => ({
        maxWidth: '90rem',
        marginRight: 'auto',
        marginLeft: 'auto',
      })}
    >
      {body.map((component, i) => {
        let res = buildComponent(component, i, i === body.length - 1);
        if (i === body.length - 1) {
          console.log('1234567');
          res = (
            <div>
              {res}
              <UserSurvey />
            </div>
          );
        }
        return res;
      })}
    </FelaComponent>
  );
}

ArticleBody.propTypes = propTypes;
ArticleBody.defaultProps = defaultProps;

export default ArticleBody;
