/* global localStorage */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, } from 'react-apollo';
import { FelaComponent, } from 'react-fela';
import { borderBottom, borderTop, parseStyleProps, } from '@haaretz/htz-css-tools';
import IconClock from '../../../Icon/icons/IconClock';
import IconLevels from '../../../Icon/icons/IconLevels';
import IconPortions from '../../../Icon/icons/IconPortions';
import Rating from './Rating';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';

import RATE_ARTICLE from '../queries/rate_article';

const propTypes = {
  articleId: PropTypes.string.isRequired,
  totalCookTime: PropTypes.string,
  numOfServings: PropTypes.string,
  recipeDifficultyLevel: PropTypes.string,
  articleRankCounter: PropTypes.number,
  articleRankersCounter: PropTypes.number,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};
const defaultProps = {
  articleRankCounter: 0,
  articleRankersCounter: 0,
  miscStyles: null,
  totalCookTime: null,
  numOfServings: null,
  recipeDifficultyLevel: null,
};

const checkAndWriteToLocalStorage = articleId => {
  const history = JSON.parse(localStorage.getItem('starRatingHistory')) || [];
  if (!history.includes(articleId)) {
    history.push(articleId);
    localStorage.setItem('starRatingHistory', JSON.stringify(history, null, 2));
    return false;
  }
  return true;
};

class RecipeRating extends Component {
  state = {
    userRating: null,
  };

  render() {
    const {
      articleId,
      miscStyles,
      totalCookTime,
      numOfServings,
      recipeDifficultyLevel,
      articleRankCounter,
      articleRankersCounter,
    } = this.props;

    const reviewStars = this.state.userRating
      ? Math.round(
        ((articleRankCounter + this.state.userRating) / (articleRankersCounter + 1)) * 2
      ) / 2
      : Math.round((articleRankCounter / articleRankersCounter) * 2) / 2;

    const cleanArticleId = articleId.startsWith('/') ? articleId.substring(1) : articleId;
    return (
      <FelaComponent
        style={theme => ({
          maxWidth: theme.articleStyle.body.maxWidth,
          marginRight: 'auto',
          marginLeft: 'auto',
          extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
        })}
        render={({
          className,
          theme,
          theme: {
            recipeRatingI18n: { levelText, highlightedText, ratingTitle, },
          },
        }) => {
          const rows = [
            ...(recipeDifficultyLevel
              ? [
                  {
                    icon: 'levels',
                    highLightedText: highlightedText.level,
                    text: levelText[recipeDifficultyLevel],
                  },
                ]
              : []),
            ...(numOfServings
              ? [
                  {
                    icon: 'portions',
                    highLightedText: highlightedText.portions,
                    text: numOfServings,
                  },
                ]
              : []),
            ...(totalCookTime
              ? [ { icon: 'clock', highLightedText: highlightedText.time, text: totalCookTime, }, ]
              : []),
          ];
          return (
            <div className={className}>
              <FelaComponent
                style={{
                  fontWeight: 'bold',
                  color: theme.color('neutral', '-2'),
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  extend: [
                    borderBottom('1px', 2, 'solid', theme.color('neutral', '-5')),
                    theme.type(-1),
                    theme.mq({ from: 'l', }, { flexDirection: 'column', alignItems: 'flex-start', }),
                  ],
                }}
              >
                <div>{theme.recipeRatingI18n.ratingTitle}</div>
                <FelaComponent
                  style={{
                    extend: [
                      theme.mq(
                        { until: 'l', },
                        {
                          marginInlineStart: '2rem',
                        }
                      ),
                    ],
                  }}
                >
                  <ApolloConsumer>
                    {client => (
                      <Rating
                        newRating={starRanking => {
                          const alreadyuserRating = checkAndWriteToLocalStorage(cleanArticleId);
                          if (!alreadyuserRating) {
                            client.query({
                              query: RATE_ARTICLE,
                              variables: { articleId: cleanArticleId, starRanking, },
                            });
                            this.setState({ userRating: starRanking, });
                          }
                        }}
                        rating={reviewStars}
                      />
                    )}
                  </ApolloConsumer>
                  {articleRankersCounter > 5 ? (
                    <FelaComponent
                      style={{
                        marginInlineStart: '1rem',
                        color: theme.color('primary'),
                      }}
                      render="span"
                    >
                      ({this.state.userRating
                        ? articleRankersCounter + 1
                        : articleRankersCounter + 0})
                    </FelaComponent>
                  ) : null}
                </FelaComponent>
              </FelaComponent>
              {rows.map(row => {
                const iconAttrs = { role: 'presentation', 'aria-hidden': true, };
                const icon = {
                  clock: <IconClock attrs={iconAttrs} />,
                  portions: <IconPortions attrs={iconAttrs} />,
                  levels: <IconLevels attrs={iconAttrs} />,
                };
                return (
                  <FelaComponent
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      extend: [
                        theme.type(-2),
                        borderBottom('1px', 2, 'solid', theme.color('neutral', '-5')),
                        borderTop('1px', 1, 'solid', 'transparent'),
                      ],
                    }}
                  >
                    <FelaComponent
                      style={{
                        color: theme.color('primary'),
                        marginInlineEnd: '1rem',
                        extend: [ theme.type(2), ],
                      }}
                      render="span"
                    >
                      {icon[row.icon]}
                    </FelaComponent>
                    <FelaComponent
                      style={{ fontWeight: 'bold', marginInlineEnd: '1rem', }}
                      render="span"
                    >
                      {row.highLightedText}:
                    </FelaComponent>
                    <span>{row.text}</span>
                  </FelaComponent>
                );
              })}
            </div>
          );
        }}
      />
    );
  }
}

RecipeRating.propTypes = propTypes;
RecipeRating.defaultProps = defaultProps;

export default RecipeRating;