import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from 'next/error';
import { graphql, gql, } from 'react-apollo';
import { propType, } from 'graphql-anywhere';
import { StyleProvider, } from '@haaretz/htz-components';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import TopNav from '../components/TopNav/TopNav';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Slot from '../components/Slot/Slot';

const PageData = gql`
  query PageData($pathname: String!, $contentId: ID) {
    page(pathname: $pathname, contentId: $contentId) {
      pageType
      contentId
      contentName
      seoData {
        metaTitle
        metaDescription
        metaKeywords
        canonicalLink
        ogImages
        obTitle
      }
      ...BreadcrumbsPage
      slots {
        ...SlotContent
      }
    }
  }
  ${Breadcrumbs.fragments.page}
  ${Slot.fragments.content}
`;

const propTypes = {
  /**
   * Information about the GraphQL query from Apollo.
   */
  data: propType(PageData).isRequired,
  /**
   * An object containing route information from Next, such as the `pathname`
   * and `query` object.
   */
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      section: PropTypes.string,
      contentId: PropTypes.string,
      tier: PropTypes.oneOf([ 'free', 'premium', ]),
    }).isRequired,
  }).isRequired,
};
const defaultProps = {};

export class MainLayout extends React.Component {
  renderHead() {
    const { data, } = this.props;
    if (!data.page) {
      return null;
    }
    const { seoData, } = data.page;
    return (
      <Head>
        <title>{seoData.metaTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.metaKeywords.join(', ')} />
        <meta name="news_keywords" content={seoData.metaKeywords.join(', ')} />
        {seoData.ogImages.map(image => (
          <meta property="og:image" content={image} />
        ))}
        <link rel="canonical" href={seoData.canonicalLink} />
      </Head>
    );
  }

  renderSlots() {
    const { data, } = this.props;
    return data.page
      ? data.page.slots.map(slot => <Slot {...slot} key={slot.name} />)
      : [];
  }

  render() {
    const { data, } = this.props;
    if (data.error) {
      // FIXME: This is essentially duplicated in `withData`. Figure out a
      // more reasonable error handling strategy.
      const isNotFound = data.error.graphQLErrors.some(
        ({ message, }) => message === 'Not Found'
      );
      return <Error statusCode={isNotFound ? 404 : 500} />;
    }
    return (
      <StyleProvider renderer={styleRenderer}>
        <div>
          {this.renderHead()}
          <TopNav />
          <h1>
            {data.loading ? 'Loading…' : data.page ? data.page.contentName : ''}
          </h1>
          {data.page ? <Breadcrumbs page={data.page} /> : null}
          {this.renderSlots()}
        </div>
      </StyleProvider>
    );
  }
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default graphql(PageData, {
  options: props => ({
    variables: {
      pathname: props.url.pathname,
      contentId: props.url.query.contentId,
    },
  }),
})(MainLayout);
