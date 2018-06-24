import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaTheme, } from 'react-fela';
import Button from '../Button/Button';
import FlippingArrow from '../Animations/FlippingArrow';
import DropdownList from './DropdownList';
import {
  dropdownItemStyle,
  dropdownListStyle,
} from '../Masthead/mastheadDropdownListStyle';

const propTypes = {
  /**
   * The item's name to display.
   */
  name: PropTypes.string.isRequired,
  /**
   * Item's destination.
   */
  url: PropTypes.string.isRequired,
  /**
   * Item's pages (may contain pages or sub-pages with their own pages).
   */
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The page's name to display.
       */
      name: PropTypes.string,
      /**
       * Page's destination.
       */
      url: PropTypes.string,
      /**
       * 3rd+ level of sub-pages.
       */
      pages: PropTypes.arrayOf(PropTypes.object),
    })
  ),
  /**
   * Button's variant to be used.
   */
  variant: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  miscStyles: PropTypes.object,
};

const defaultProps = {
  pages: null,
  variant: 'secondaryOpaque',
  miscStyles: {},
};

const Item = ({ name, url, pages, variant, miscStyles, }) => (
  <FelaTheme
    render={theme => (
      <Fragment>
        <Button
          boxModel={{ vp: 1, hp: 2, }}
          isFull
          fontSize={-2}
          variant={variant}
          href={url}
          miscStyles={{
            display: 'flex',
            justifyContent: 'flex-start',
            position: 'static',
            ...miscStyles,
          }}
        >
          <span>{name}</span>
        </Button>
        {pages && pages.length > 0 ? (
          <DropdownList
            isLast
            render={({ renderButton, ListWrapper, isOpen, }) => {
              const combinedItems = pages.map(item => (
                <Item
                  key={item.name}
                  miscStyles={{
                    backgroundColor: theme.color('secondary', '+1'),
                    ':hover': {
                      backgroundColor: theme.color('secondary', '+2'),
                    },
                    ':focus': {
                      backgroundColor: theme.color('secondary', '+2'),
                    },
                  }}
                  {...item}
                />
              ));
              return (
                <Fragment>
                  {renderButton(({ toggleState, }) => (
                    <Button
                      boxModel={{ vp: 1, hp: 2, }}
                      variant="secondaryOpaque"
                      isHard
                      onClick={toggleState}
                      aria-expanded={isOpen}
                      aria-label={`more ${name}`}
                      miscStyles={{
                        position: 'static',
                        ...(isOpen
                          ? { backgroundColor: theme.color('secondary', '+1'), }
                          : {}),
                      }}
                    >
                      <FlippingArrow
                        isOpen={isOpen}
                        color={[ 'neutral', '-10', ]}
                        size={1.5}
                        direction={theme.direction}
                      />
                    </Button>
                  ))}
                  {isOpen && (
                    <ListWrapper
                      listStyle={{
                        ...dropdownListStyle(theme),
                        top: '0',
                        start: '100%',
                        position: 'absolute',
                      }}
                      itemStyle={dropdownItemStyle(theme)}
                    >
                      {combinedItems}
                    </ListWrapper>
                  )}
                </Fragment>
              );
            }}
          />
        ) : null}
      </Fragment>
    )}
  />
);

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
