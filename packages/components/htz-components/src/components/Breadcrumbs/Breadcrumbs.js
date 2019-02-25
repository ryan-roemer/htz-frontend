import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';

import HtzLink from '../HtzLink/HtzLink';
import Query from '../ApolloBoundary/Query';
import Mutation from '../ApolloBoundary/Mutation';

import IconRamatGan from '../Icon/icons/IconRamatGan';
import IconBeerSheva from '../Icon/icons/IconBeerSheva';
import IconJerusalem from '../Icon/icons/IconJerusalem';
import IconPetachTikva from '../Icon/icons/IconPetachTikva';
import IconGaniYoshua from '../Icon/icons/IconGaniYoshua';

const propTypes = {
  className: PropTypes.string,
  updateArticleSection: PropTypes.func.isRequired,
  crumbs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const defaultProps = {
  className: null,
};

const GET_BREADCRUMBS = gql`
  query Breadcrumbs($path: String!) {
    page(path: $path) {
      ...PageBreadcrumbs
    }
  }
  ${breadcrumbs}
`;

const UPDATE_SECTION = gql`
  mutation updateArticleSection($id: String!, $name: String!, $url: String!) {
    updateArticleSection(id: $id, name: $name, url: $url) @client
  }
`;

const CityIcon = ({ icon, ...props }) => {
  switch (icon) {
    case 'IconRamatGan':
      return <IconRamatGan {...props} />;
    case 'IconBeerSheva':
      return <IconBeerSheva {...props} />;

    case 'IconJerusalem':
      return <IconJerusalem {...props} />;
    case 'IconPetachTikva':
      return <IconPetachTikva {...props} />;
    case 'IconGaniYoshua':
      return <IconGaniYoshua {...props} />;
    default:
      return <IconGaniYoshua {...props} />;
  }
};

// eslint-disable-next-line react/prop-types
const ColoredLink = ({ crumb, }) => (
  <FelaComponent
    key={crumb.contentId}
    style={(
      {
        theme,
      }
    ) => ({
      fontWeight: '700',
      marginInlineEnd: '1rem',

      ':hover': {
        textDecoration: 'underline',
        underlineSkip: 'ink',
      },

      extend: [ theme.type(-1), ],
    })}
  >
    {({ className, }) => (
      <HtzLink className={className} content={crumb.name} href={crumb.url} />
    )}
  </FelaComponent>
);

class Breadcrumbs extends React.Component {
  componentDidMount() {
    const { updateArticleSection, crumbs, } = this.props;
    const variables = {
      name: null,
      id: null,
      url: null,
    };
    const length = crumbs.length;
    if (length > 0) {
      variables.name = crumbs[length - 1].name;
      variables.id = crumbs[length - 1].contentId;
      variables.url = crumbs[length - 1].url;
    }
    updateArticleSection({
      variables,
    });
  }

  addMousePostFix = crumbs => {
    const newItems = [ ...crumbs, ];
    const pop = { ...newItems.pop(), };
    pop.name += '(הארץ Labels)';
    newItems.push(pop);
    return newItems;
  };

  render() {
    const { crumbs, className, } = this.props;

    // exit early if no breadcrumbs
    if (!crumbs.length) return null;

    const labelsSectionsIndex = {
      2.16463: 'IconRamatGan',
      2.16464: 'IconBeerSheva',
      2.16455: 'IconJerusalem',
      2.16457: 'IconPetachTikva',
      2.16465: 'IconGaniYoshua',
    };
    const labelsSections = Object.keys(labelsSectionsIndex);
    const lastCrumb = crumbs.slice(-1)[0] || '';
    const isLastOfLabelSection = labelsSections.includes(lastCrumb.contentId);
    const updatedCrumbs = isLastOfLabelSection ? this.addMousePostFix(crumbs) : crumbs;
    const crumbLinks = updatedCrumbs.map(crumb => <ColoredLink crumb={crumb} />);

    const cityIconWrapper = isLastOfLabelSection ? (
      <FelaComponent style={{ float: 'left', }} as="span">
        <CityIcon icon={labelsSectionsIndex[lastCrumb.contentId]} height="4.5rem" />
      </FelaComponent>
    ) : null;

    return (
      <FelaTheme>
        {theme => {
          const {
            breadcrumbsI18n: { ariaLabel, },
          } = theme;
          return (
            <Fragment>
              <nav aria-label={ariaLabel} className={className}>
                {crumbLinks.map((elem, index) => {
                  const isLast = crumbLinks.length - 1 === index;
                  return (
                    <Fragment key={elem.props.crumb.contentId + elem.props.crumb.pathSegment}>
                      <FelaComponent
                        as="span"
                        style={{
                  color:
                            index === 0 ? theme.color('primary') : theme.color('neutral', '-2'),
                  ':hover': {
                    color:
                              index === 0
                                ? theme.color('primary', '+1')
                                : theme.color('neutral', '-1'),
                  },
                  extend: [
                    theme.mq(
                      { until: 's', },
                      isLast
                        ? { color: theme.color('primary'), }
                        : {
                          // hide every item but the last
                          display: 'none',
                        }
                    ),
                  ],
                }}
                      >
                        {elem}
                      </FelaComponent>
                      {isLast ? null : (
                        <FelaComponent
                  style={{
                            extend: [
                              theme.mq(
                                { until: 's', },
                                {
                                  display: 'none',
                                }
                              ),
                            ],
                          }}
                  as="span"
                >
                  {' | '}
                </FelaComponent>
                      )}
                    </Fragment>
                  );
                })}
                {cityIconWrapper}
              </nav>
            </Fragment>
          );
        }}
      </FelaTheme>
    );
  }
}

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

// eslint-disable-next-line react/prop-types
export default ({ articleId, ...props }) => (
  <Query query={GET_BREADCRUMBS} variables={{ path: articleId, }} errorPolicy="all">
    {({ data, loading, error, }) => {
      if (loading) return null;
      if (error) return null;
      if (!data || !data.page) throw new TypeError('no data !!');
      const { lineage, } = data.page;
      // creating a copy because when the 'steps' array is received from apollo, he is sealed.
      const crumbs = [ ...lineage, ].reverse();
      crumbs.shift();
      crumbs.pop();
      return (
        <Mutation mutation={UPDATE_SECTION}>
          {updateArticleSection => (
            <Breadcrumbs
              crumbs={crumbs.slice(-2)}
              {...props}
              updateArticleSection={updateArticleSection}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);
