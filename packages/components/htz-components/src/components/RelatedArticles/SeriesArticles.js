import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import ArticleLink from './articleLink';
import Button from '../Button/Button';
import H from '../AutoLevels/H';

const GET_ARTICLE_ID = gql`
  query {
    articleId @client
  }
`;

const propTypes = {
  /**
   * The name of the series to display.
   */
  seriesTitle: PropTypes.string.isRequired,
  /**
   * Should I use pagination, or just display the whole list ??
   */
  usePagination: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool, ])
    .isRequired,
  /**
   * In case you choose to use pagination, how many article should be displayed ?
   */
  itemsPerPage: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
  /**
   * An array of article objects.
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Article title to display.
       */
      title: PropTypes.string.isRequired,
      /**
       * Article's destination.
       */
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Should be passed if the component should have a MarginBottom style.
   */
  marginBottom: PropTypes.oneOfType([
    /**
     * simple fela style object.
     */
    PropTypes.shape({
      marginBottom: PropTypes.string,
    }),
    /**
     * multiple objects, each for a different break.
     */
    PropTypes.shape({
      break: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
      break2: PropTypes.shape({
        marginBottom: PropTypes.string,
      }),
    }),
  ]),
};

const defaultProps = {
  itemsPerPage: 3,
  marginBottom: null,
};

const seriesTitleStyle = ({ theme, }) => ({
  ...theme.type(0),
  color: theme.color('neutral', '-1'),
  marginBottom: '1rem',
});

const SeriesTitle = createComponent(seriesTitleStyle, H);

const articleListWrapperStyle = ({ theme, }) => ({
  transitionProperty: 'height',
  ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
  marginBottom: '3rem',
});

const ArticleListWrapper = createComponent(
  articleListWrapperStyle,
  'ul',
  props => Object.keys(props)
);

const AriaHidden = createComponent(() => ({ display: 'none', }), 'span');

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  marginInlineStart: '1em',
  position: 'relative',
  color: theme.color('primary', '+1'),
  ...(!lastItem && {
    ...parseComponentProp(
      'marginBottom',
      theme.articleStyle.body.marginBottom,
      theme.mq,
      (prop, value) => ({ [prop]: value, })
    ),
    ':after': {
      content: '""',
      position: 'absolute',
      start: '0',
      top: '1.5em',
      height: 'calc(100%)',
      transform: 'translate(485%, 0%)',
      borderWidth: '1.2px',
      borderStyle: 'solid',
      borderColor: theme.color('primary', '-1'),
    },
  }),
  ':before': {
    content: '"\\25cf"',
    position: 'absolute',
    start: '0',
    top: '0',
    transform: 'translate(150%)',
    color: theme.color('primary', '-1'),
  },
});
const ArticleWrapper = createComponent(articleWrapperStyle, 'li');

export default class SeriesArticles extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentWillMount() {
    const { articles, usePagination, itemsPerPage, } = this.props;
    const pagination =
      articles.length > 3 &&
      !(!usePagination || (usePagination && usePagination === 'false')) &&
      articles.length > +itemsPerPage;
    const perPage = +itemsPerPage || 3;
    const articlesToDisplay = pagination
      ? this.props.articles.slice(0, perPage)
      : articles;
    const remainingArticlesCount = articles.length - itemsPerPage;

    this.setState({
      usePagination: pagination,
      itemsPerPage: perPage,
      articlesToDisplay,
      remainingArticlesCount,
      isOpen: false,
    });
  }

  setArticlesToDisplay = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      articlesToDisplay: this.state.isOpen
        ? this.props.articles.slice(0, this.state.itemsPerPage)
        : this.props.articles,
    });
  };

  render() {
    return (
      <FelaComponent
        style={{ ...(this.props.marginBottom || []), }}
        render={({
          className,
          theme: { seriesArticleI18n: { loadButton, titlePrefix, }, },
        }) => (
          <div className={className}>
            <ArticleListWrapper aria-live="polite">
              <SeriesTitle>{titlePrefix + this.props.seriesTitle}</SeriesTitle>
              <Query query={GET_ARTICLE_ID}>
                {({ data: { articleId, }, }) =>
                  this.state.articlesToDisplay.map((article, i) => (
                    <ArticleWrapper
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      lastItem={i === this.state.articlesToDisplay.length - 1}
                    >
                      {this.state.isOpen &&
                        this.state.itemsPerPage === i && (
                          <AriaHidden>
                            {loadButton.ariaText(
                              this.state.remainingArticlesCount
                            )}
                          </AriaHidden>
                        )}
                      <ArticleLink
                        article={article}
                        currentArticle={articleId === article.contentId}
                        focus={
                          this.state.isOpen && this.state.itemsPerPage === i
                        }
                      />
                    </ArticleWrapper>
                  ))
                }
              </Query>
            </ArticleListWrapper>
            {this.state.usePagination && (
              <Button
                boxModel={{ hp: 3, vp: 1, }}
                miscStyles={{ type: -1, }}
                onClick={this.setArticlesToDisplay}
              >
                {this.state.isOpen
                  ? loadButton.open
                  : `${loadButton.close} ${this.state.remainingArticlesCount}`}
              </Button>
            )}
            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'ItemList',
                itemListElement: [
                  ...this.props.articles.map((article, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: article.url,
                  })),
                ],
              })}
            </script>
          </div>
        )}
      />
    );
  }
}
