import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../../ApolloBoundary/Query';
import VisuallyHidden from '../../VisuallyHidden/VisuallyHidden';
import Button from '../../Button/Button';
import ClickArea from '../../ClickArea/ClickArea';
import hoverableButtonRule from '../hoverableButtonRule';
import DropdownList from '../../DropdownList/DropdownList';
import IconAccessibility from '../../Icon/icons/IconAccessibility';
import Item from '../../DropdownList/DropdownItem';
import { dropdownItemStyle, dropdownListStyle, } from '../mastheadDropdownListStyle';

const GET_A11Y_STATE = gql`
  query GetA11yStatus {
    a11yToggle @client
  }
`;

/**
 * A menu component for the page header. A component which generate
 * two options: toggle accessibility on apollo link state and report a problem via email
 */
class MastheadA11yMenu extends React.Component {
  buttonRef = React.createRef();

  render() {
    return (
      <FelaTheme>
        {theme => {
          const initialItems = theme.a11yMenuI18n.menuItems;
          const combinedItems = closeList => [
            <Query query={GET_A11Y_STATE} key="toggleA11y">
              {({ data, loading, client, }) => {
                const { a11yToggle, } = data;
                return (
                  <Button
                    boxModel={{ vp: 1, hp: 2, }}
                    isFull
                    isHard
                    fontSize={-2}
                    variant="secondaryOpaque"
                    miscStyles={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                    onClick={() => {
                      client.writeData({
                        data: {
                          a11yToggle: !a11yToggle,
                        },
                      });
                      closeList();
                    }}
                  >
                    <span>{theme.a11yMenuI18n.a11yToggle(a11yToggle)}</span>
                  </Button>
                );
              }}
            </Query>,
            ...initialItems.map((item, index) => (
              <Item key={item.name} onClick={closeList} {...item} />
            )),
          ];

          return (
            <DropdownList
              mainMenuStyle={{ position: 'relative', }}
              onClose={() => {
                this.buttonRef.current.focus();
              }}
              render={({ renderButton, ListWrapper, isOpen, closeList, }) => (
                <Fragment>
                  {renderButton(({ toggleState, }) => (
                    <FelaComponent style={hoverableButtonRule} isOpen={isOpen}>
                      {({ className, theme: { a11yMenuI18n, }, }) => (
                        <button
                          aria-describedby="masthead-a11y-dropdown-button"
                          type="button"
                          className={className}
                          ref={this.buttonRef}
                          onClick={toggleState}
                        >
                          <ClickArea tagName="span" size={6}>
                            <IconAccessibility size={3.5} />
                          </ClickArea>
                          <VisuallyHidden id="masthead-a11y-dropdown-button">
                            {a11yMenuI18n.a11yTitle}
                          </VisuallyHidden>
                        </button>
                      )}
                    </FelaComponent>
                  ))}
                  {isOpen ? (
                    <FelaTheme>
                      {theme => (
                        <ListWrapper
                          listStyle={{ ...dropdownListStyle(theme), end: '0', }}
                          itemStyle={dropdownItemStyle(theme)}
                          closeList={closeList}
                        >
                          {combinedItems(closeList)}
                        </ListWrapper>
                      )}
                    </FelaTheme>
                  ) : null}
                </Fragment>
              )}
            />
          );
        }}
      </FelaTheme>
    );
  }
}

export default MastheadA11yMenu;
