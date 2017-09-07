import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { gql, } from 'react-apollo';
import { connect, } from 'react-fela';

const fragments = {
  page: gql`
    fragment BreadcrumbsPage on Page {
      lineage {
        contentId
        name
        url
      }
    }
  `,
};

const propTypes = {
  /**
   * The page being rendered, which will have a `lineage` array containing
   * the breadcrumb links.
   */
  page: PropTypes.shape({
    lineage: PropTypes.arrayOf(
      PropTypes.shape({
        contentId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  /**
   * An object whose keys map to `className` values generated by Fela.
   */
  styles: PropTypes.shape({
    container: PropTypes.string,
    separator: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  page: null,
};

const rules = {
  container: props => ({
    margin: 0.25,
    padding: 0.25,
    border: '1px solid #ccc',
  }),
  separator: props => ({
    marginLeft: 0.5,
    marginRight: 0.5,
  }),
  link: props => ({}),
};

export function Breadcrumbs({ page, styles, }) {
  const items = page.lineage.slice(1); // Remove the page itself from `lineage`.
  if (items.length) {
    return (
      <div className={styles.container}>
        {items.map((taxonomyItem, i) => [
          i ? <span className={styles.separator}>•</span> : null,
          <Link
            href={{
              pathname: '/article',
              query: { contentId: taxonomyItem.contentId, },
            }}
            as={taxonomyItem.url}
            key={taxonomyItem.contentId}
          >
            <a className={styles.link}>{taxonomyItem.name}</a>
          </Link>,
        ])}
      </div>
    );
  }
  return null;
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

const StyledBreadcrumbs = connect(rules)(Breadcrumbs);
StyledBreadcrumbs.fragments = fragments;

export default StyledBreadcrumbs;
