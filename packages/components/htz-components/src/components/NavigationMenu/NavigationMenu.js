/* global document */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import Query from '../ApolloBoundary/Query';
import NavigationQuery from './navigationQuery';
import DropdownList from '../DropdownList/DropdownList';
import Hamburger from '../Animations/Hamburger';
import Item from '../DropdownList/DropdownItem';
import { dropdownItemStyle, dropdownListStyle, } from '../Masthead/mastheadDropdownListStyle';
import UserDispenser from '../User/UserDispenser';
import EventTracker from '../../utils/EventTracker';

const menuButtonStyle = ({ theme, isOpen, isHovered, }) => ({
  border: 'none',
  color: theme.color('neutral', '-3'),
  display: 'block',
  fontWeight: '700',
  // this padding affects all the items in the masthead
  // paddingTop: '1.5rem',
  // paddingBottom: '1.5rem',
  paddingRight: '1rem',
  paddingLeft: '1rem',
  ...(isOpen
    ? {
      backgroundColor: theme.color('secondary'),
      color: theme.color('neutral', '-10'),
    }
    : {}),
  ':hover': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  ':focus': {
    backgroundColor: theme.color('primary'),
    color: theme.color('neutral', '-10'),
  },
  extend: [
    isHovered
      ? {
        backgroundColor: theme.color('primary'),
        color: theme.color('neutral', '-10'),
      }
      : {},
    theme.type(-1, { lines: 6, }),
    theme.getTransition(1, 'swiftOut'),
  ],
});

const baseProp = {
  /**
   * The section's name to display.
   */
  name: PropTypes.string,
  /**
   * Section's destination.
   */
  url: PropTypes.string,
  /**
   * Section's pages (may contain pages or sub-sections with their own pages).
   */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The page's name to display.
       */
      name: PropTypes.string,
      /**
       * page's destination.
       */
      url: PropTypes.string,
      /**
       * page's sub-pages as described above.
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};

/**
 * A menu component for the page header. A recursive component which receives an array
 * of sections that may contain pages and sub-section, and the later may also contain
 * pages and sub-section and so on...
 */
class NavigationMenu extends React.Component {
  static propTypes = {
    /**
     * An object of sections to be listed, each with a different styling.
     */
    menuSections: PropTypes.shape({
      /**
       * An array of main menu items.
       */
      items: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      /**
       * An array of sites links.
       */
      sites: PropTypes.arrayOf(PropTypes.shape(baseProp)),
      /**
       * An array of promotion items.
       */
      promotions: PropTypes.arrayOf(PropTypes.shape(baseProp)),
    }).isRequired,
    /* User type from User dispenser in Masthead */
    userType: PropTypes.string,
  };

  static defaultProps = {
    userType: null,
  };

  state = { isHovered: false, };

  handleMouseEnter = () => this.setState({ isHovered: true, });

  handleMouseLeave = () => this.setState({ isHovered: false, });

  componentDidUpdate = (prevProp, prevState) => {
    this.changeHovered = prevState.isHovered !== this.state.isHovered;
  };

  render() {
    return (
      <EventTracker>
        {({ biAction, }) => (
          <FelaTheme>{theme => {
              const { isHovered, } = this.state;
              const { items, sites, promotions, } = this.props.menuSections;

              const combinedItems = items
                && items.map(item => (
                  <Item
                    key={`item ${item.name}`}
                    {...item}
                    onClick={
                      biAction && item.url
                        ? () => biAction({
                          actionCode: 133,
                          additionalInfo: {
                            name: item.name,
                            url: item.url,
                          },
                        })
                        : null
                    }
                  />
                ));

              const combinedSites = sites
                && sites.map(site => (
                  <Item
                    key={`site ${site.name}`}
                    onClick={
                      biAction && site.url
                        ? () => biAction({
                          actionCode: 133,
                          additionalInfo: {
                            name: site.name,
                            url: site.url,
                          },
                        })
                        : null
                    }
                    miscStyles={{
                      textDecoration: 'underline',
                      fontWeight: 'normal',
                      backgroundColor: theme.color('primary', '+1'),
                    }}
                    {...site}
                  />
                ));

              const combinedPromotions = !(this.props.userType === 'paying')
                && promotions
                && promotions.map(promotion => (
                  <Item
                    key={`promotion ${promotion.name}`}
                    onClick={
                      biAction && promotion.url
                        ? () => biAction({
                          actionCode: 133,
                          additionalInfo: {
                            name: promotion.name,
                            url: promotion.url ? promotion.url : 'no promotion url',
                          },
                        })
                        : null
                    }
                    variant="salesOpaque"
                    miscStyles={{ justifyContent: 'center', }}
                    {...promotion}
                  />
                ));

              const combinedMenu = [
                ...(combinedItems || []),
                ...(combinedSites || []),
                ...(combinedPromotions || []),
              ];

              return (
                <DropdownList
                  mainMenuStyle={{ position: 'relative', }}
                  onClose={() => this.hamburgerEl.focus()}
                  render={({ renderButton, ListWrapper, isOpen, closeList, }) => (
                    <Fragment>
                      {renderButton(({ toggleState, }) => (
                        <FelaComponent style={menuButtonStyle} isOpen={isOpen} isHovered={isHovered}>{({ className, }) => (
                            <button
                              className={className}
                              onClick={
                                !isOpen && biAction
                                  ? () => {
                                    toggleState();
                                    biAction({ actionCode: 132, });
                                  }
                                  : toggleState
                              }
                              aria-expanded={isOpen}
                              ref={el => {
                                if (!this.hamburgerEl) {
                                  this.hamburgerEl = el;
                                }
                              }}
                              onMouseEnter={this.handleMouseEnter}
                              onMouseLeave={this.handleMouseLeave}
                              onFocus={this.handleMouseEnter}
                              onBlur={this.handleMouseLeave}
                              type="button"
                            >
                              <FelaComponent
                                style={{
                                  marginStart: '2rem',
                                  marginEnd: '3rem',
                                  position: 'relative',
                                }}
                                as="span"
                              >
                                <Hamburger
                                  isOpen={isOpen}
                                  color={{
                                    close: isHovered ? [ 'neutral', '-10', ] : [ 'neutral', '-3', ],
                                    open: [ 'neutral', '-10', ],
                                  }}
                                  size={2.5}
                                  isTransition
                                />
                              </FelaComponent>
                              <span>{theme.navigationMenuI18n.buttonText}</span>
                            </button>
                          )}</FelaComponent>
                      ))}
                      {isOpen ? (
                        <ListWrapper
                          listStyle={{
                            ...dropdownListStyle(theme),
                            minWidth: '29rem',
                          }}
                          itemStyle={dropdownItemStyle(theme)}
                          closeList={closeList}
                        >
                          {combinedMenu}
                        </ListWrapper>
                      ) : null}
                    </Fragment>
                  )}
                />
              );
            }}</FelaTheme>
        )}
      </EventTracker>
    );
  }
}

// eslint-disable-next-line react/prop-types
export default ({ contentId, }) => (
  <Query query={NavigationQuery} variables={{ listId: contentId, }}>
    {({ data, loading, error, }) => {
      if (error) return null;
      if (loading) return <NavigationMenu menuSections={{}} />;
      const {
        navMenu: { menu, },
      } = data;
      return (
        <UserDispenser
          render={({ user, }) => <NavigationMenu menuSections={menu} userType={user.type} />}
        />
      );
    }}
  </Query>
);
