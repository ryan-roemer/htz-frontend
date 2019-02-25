import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderEnd, } from '@haaretz/htz-css-tools';
import Button from '../../Button/Button';
import Hamburger from '../../Animations/Hamburger';
import IconClose from '../../Icon/icons/IconClose';
import MenuList from './MobileNavigationMenuList';
import MobileMenuHeader from '../MobileMenuHeader/MobileMenuHeader';
import NavigationQuery from '../../NavigationMenu/navigationQuery';
import Query from '../../ApolloBoundary/Query';
import A11yDialog from '../../A11yDialog/A11yDialog';
import NoSSR from '../../NoSSR/NoSSR';
import disablePageScroll from './disablePageScroll';

const menuButtonStyle = ({ theme, menuIsOpen, isHomepage, }) => ({
  display: 'block',
  color: theme.color('neutral', '-3'),
  fontWeight: '700',
  extend: [
    theme.type(-1),
    {
      ...(isHomepage
        ? {
          marginBlockStart: '1.5rem',
          marginBlockEnd: '1.5rem',
          flexGrow: 1,
          ...borderEnd('1px', 'solid', theme.color('neutral', '-4')),
        }
        : {
          height: '100%',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          ...borderEnd('1px', 'solid', theme.color('secondary', '+1')),
        }),
      ...(menuIsOpen
        ? {
          backgroundColor: theme.color('secondary'),
          color: theme.color('neutral', '-10'),
        }
        : {}),
    },
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
 * A menu component for mobile. A component which receives an array
 * of sections that may contain pages and sub-section.
 */
class MobileNavigationMenu extends React.Component {
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
    }),
    /**
     * A callback function to hide/display the share bar.
     */
    onClick: PropTypes.func,

    wrapperSetState: PropTypes.func.isRequired,

    menuIsOpen: PropTypes.bool,
    /**
     * A boolean which indicate path location to render
     * the correct view on homepage or article page.
     */
    isHomepage: PropTypes.bool,
  };

  static defaultProps = {
    menuIsOpen: false,
    onClick: null,
    menuSections: {},
    isHomepage: false,
  };

  state = {
    searchIsOpen: false,
    modalOpen: false,
  };

  toggleOpen = () => {
    if (this.state.searchIsOpen) {
      this.toggleSearchState();
    }
    this.props.onClick();
  };

  toggleSearchState = () => {
    this.setState(prevState => ({ searchIsOpen: !prevState.searchIsOpen, }));
  };

  render() {
    const { searchIsOpen, modalOpen, } = this.state;
    const { menuSections, menuIsOpen, wrapperSetState, isHomepage, } = this.props;

    this.menuIsOpen = menuIsOpen;
    return (
      <FelaTheme>
        {theme => (
          <Fragment>
            <FelaComponent isHomepage={isHomepage} menuIsOpen={menuIsOpen} style={menuButtonStyle}>
              {({ theme, className, }) => (
                <button
                  type="button"
                  className={className}
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.toggleOpen();
                    this.menuIsOpen = !this.menuIsOpen;
                  }}
                  onFocus={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!this.menuIsOpen) {
                      wrapperSetState({ menuIsOpen: true, });
                      this.menuIsOpen = true;
                    }
                  }}
                  onBlur={() => {
                    // wrapperSetState({ menuIsOpen: false, });
                    // this.menuIsOpen = false;
                  }}
                  aria-expanded={menuIsOpen}
                >
                  <FelaComponent
                    style={{
                      marginStart: '2rem',
                      marginEnd: '2rem',
                      position: 'relative',
                    }}
                    as="span"
                  >
                    <Hamburger
                      isOpen={menuIsOpen}
                      color={{
                        close: [ 'neutral', '-3', ],
                        open: [ 'neutral', '-10', ],
                      }}
                      size={2.5}
                    />
                  </FelaComponent>
                  <span>{theme.mobileNavigationMenuI18n.buttonText}</span>
                </button>
              )}
            </FelaComponent>
            <A11yDialog
              appendTo="modalsRoot"
              elementToHide="pageRoot"
              isVisible={menuIsOpen}
              isModal
              closeOnOutsideClick
              onOpen={() => this.setState({ modalOpen: true, })}
              onClose={() => this.setState({ modalOpen: false, })}
              containerMiscStyles={{
                width: '100%',
                position: 'fixed',
                maxHeight: '60vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                top: 'auto',
                bottom: '9rem',
                left: '0',
                right: '0',
                outline: 'none',
                transform: modalOpen ? 'translateY(0)' : 'translateY(100%)',
                transitionProperty: 'transform',
                ...theme.getDuration('transition', 1),
                ...theme.getTimingFunction('transition', 'swiftIn'),
              }}
              render={({ handleClose, isVisible, isModal, }) => {
                !isVisible && menuIsOpen && this.toggleOpen();
                return (
                  <Fragment>
                    {searchIsOpen ? (
                      <Button
                        variant="neutralOpaque"
                        onClick={this.toggleSearchState}
                        aria-expanded={searchIsOpen}
                        boxModel={{ hp: 0.5, vp: 0.5, }}
                      >
                        <IconClose size={3} />
                      </Button>
                    ) : null}
                    <MobileMenuHeader
                      searchIsOpen={searchIsOpen}
                      onClick={this.toggleSearchState}
                    />
                    <MenuList menuSections={menuSections} searchIsOpen={searchIsOpen} />
                  </Fragment>
                );
              }}
            />
          </Fragment>
        )}
      </FelaTheme>
    );
  }
}

// eslint-disable-next-line react/prop-types
export default ({ contentId, menuIsOpen, onClick, wrapperSetState, isHomepage, }) => (
  <Query query={NavigationQuery} variables={{ listId: contentId, }}>
    {({ data, loading, error, }) => {
      if (error) return null;
      if (loading) return <MobileNavigationMenu />;
      const {
        navMenu: { menu, },
      } = data;
      return (
        <Fragment>
          <NoSSR>{disablePageScroll(menuIsOpen)}</NoSSR>
          <MobileNavigationMenu
            isHomepage={isHomepage}
            menuSections={menu}
            onClick={onClick}
            menuIsOpen={menuIsOpen}
            wrapperSetState={wrapperSetState}
          />
        </Fragment>
      );
    }}
  </Query>
);
