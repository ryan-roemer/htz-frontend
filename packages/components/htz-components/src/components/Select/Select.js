import React, { Component, } from 'react';
import PropTypes, { oneOf, shape, oneOfType, } from 'prop-types';
import Downshift from 'downshift';
import { createComponent, } from 'react-fela';
import { borderTop, borderBottom, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import selectStyle from './selectStyle';

const selectVariants = oneOf([ 'primary', ]);

const itemPropType = shape({
  display: PropTypes.string,
  value: oneOfType([ PropTypes.string, PropTypes.number, ]).isRequired,
  key: oneOfType([ PropTypes.string, PropTypes.number, ]),
});

const StyledSelectWrapper = createComponent(selectStyle);

const dropDownMenuStyle = ({ theme, variant, }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 0,
  extend: [
    borderBottom(
      `${theme.selectStyle.borderWidth}px`,
      theme.selectStyle.lines,
      theme.selectStyle.borderStyle,
      theme.color('select', `${variant}Border`)
    ),
  ],
});

const StyledDropDownMenu = createComponent(dropDownMenuStyle);

const ItemStyle = ({ theme, variant = 'primary', isSelected, activeItem, }) => ({
  width: '100%',
  textAlign: 'start',
  paddingInlineStart: '1rem',
  paddingInlineEnd: '1rem',
  ...(isSelected ? { fontWeight: 'bold', } : {}),
  backgroundColor:
    activeItem || isSelected
      ? theme.color('select', `${variant}HighlightedBg`)
      : theme.color('select', `${variant}Bg`),
  ':focus': {
    outline: 'none',
  },
  extend: [
    borderTop(
      `${theme.selectStyle.borderWidth}px`,
      theme.selectStyle.lines,
      theme.selectStyle.borderStyle,
      theme.color('select', `${variant}BorderItem`)
    ),
    {
      ':before': {
        left: '0',
        right: '0',
      },
    },
    {
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
  ],
});

const StyledItem = createComponent(ItemStyle, 'button', props => {
  /* eslint-disable no-unused-vars */
  const { activeItem, isOpen, isSelected, noHighlitedItems, ...noCustomAtrrProps } = props;
  return Object.keys(noCustomAtrrProps);
});

const selectedItemStyle = ({ noHighlitedItems, theme, variant, isOpen, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  ...(!isOpen
    ? {
      ':focus': {
        backgroundColor: theme.color('select', `${variant}FocusBg`),
      },
    }
    : {}),
  ':after': {
    content: '""',
    width: 0,
    height: 0,
    borderLeft: '0.3em solid transparent',
    borderRight: '0.3em solid transparent',
    borderTop: `0.5em solid ${theme.color('select', `${variant}ArrowColor`)}`,

    transitionProperty: 'all',
    transformOrigin: 'center center',
    ...theme.getTransition(0, 'swiftIn'),
    ...(isOpen ? { transform: 'rotate(180deg)', } : {}),
  },
  extend: [
    {
      ':before': { content: '', },
    },
  ],
});

const StyledSelectedItem = createComponent(selectedItemStyle, StyledItem, props => {
  /* eslint-disable no-unused-vars */
  const { isOpen, noHighlitedItems, variant, ...noCustomAtrrProps } = props;
  return Object.keys(noCustomAtrrProps);
});

export class Select extends Component {
  static propTypes = {
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying react element
     */
    attrs: attrsPropType,
    /**
     * selectedItem of a controlled `<Select />`.
     * Should never be passed manually by the consumer, but rather
     * set by the controlling component.
     */
    controlledSelectedItem: itemPropType,
    /**
     * The initial selected item of an uncontrolled `<Select />`.
     *
     * Only relevant when using an uncontrolled select.
     * Allows specifying the initial item but leaving subsequent
     * updates uncontrolled.
     */
    defaultSelectedItem: itemPropType,
    /**
     * An Array of option Objects for the Select,
     *
     * display key is the display string that will show in the Select
     *
     * the value key is the value of the input when option is chosen
     *
     * if the value is not unique, a unique key should be given to each option
     */
    items: PropTypes.arrayOf(itemPropType).isRequired,
    /**
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
    /**
     * A callback that gets the the new selectedItem
     * @param {object} item - The selected Item Object
     */
    onChange: PropTypes.func,
    /** The placeholder to display when no item is selected */
    placeholder: PropTypes.string,
    /** The `<Select />`'s stylistic variant */
    variant: PropTypes.oneOfType([
      selectVariants,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: selectVariants.isRequired,
        })
      ),
    ]),
  };
  static defaultProps = {
    attrs: null,
    controlledSelectedItem: null,
    defaultSelectedItem: null,
    miscStyles: null,
    onChange: null,
    placeholder: 'בחר אחת מהאפשרויות הבאות',
    variant: 'primary',
  };

  state = {
    selectedItem: null,
  };

  handleChange = selectedItem => {
    this.setState({ selectedItem, });
    if (this.props.onChange) this.props.onChange(selectedItem);
  };

  render() {
    const {
      attrs,
      controlledSelectedItem,
      defaultSelectedItem,
      items,
      miscStyles,
      onChange,
      placeholder,
      variant,
    } = this.props;
    const selectedItem = controlledSelectedItem || this.state.selectedItem;
    const selectedItemIndex = items
      .map(item => item.key || item.value)
      .indexOf(selectedItem ? selectedItem.key || selectedItem.value : null);

    return (
      <Downshift
        selectedItem={selectedItem}
        {...(defaultSelectedItem ? { defaultSelectedItem, } : {})}
        defaultHighlightedIndex={selectedItem ? selectedItemIndex : 0}
        itemToString={item => (item ? item.display : null)}
        onChange={this.handleChange}
        render={({
          isOpen,
          getButtonProps,
          getItemProps,
          highlightedIndex,
          toggleMenu,
          selectItemAtIndex,
        }) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            {...attrs}
            onKeyDown={evt => {
              if (isOpen) {
                if (evt.keyCode === 9) toggleMenu();
                if (evt.keyCode === 32) selectItemAtIndex(highlightedIndex);
              }
            }}
          >
            <StyledSelectWrapper miscStyles={miscStyles} isOpen={isOpen} variant={variant}>
              <StyledSelectedItem
                {...getButtonProps({
                  variant,
                  isOpen,
                  noHighlitedItems: highlightedIndex === null,
                  type: 'button',
                })}
              >
                {selectedItem ? selectedItem.display || selectedItem.value : placeholder}
              </StyledSelectedItem>
              <div style={{ position: 'relative', }}>
                {isOpen && (
                  <StyledDropDownMenu variant={variant} data-test="dropdown-menu">
                    {items.map((item, index) => (
                      <StyledItem
                        {...getItemProps({
                          item,
                          key: item.key || item.value,
                          activeItem: highlightedIndex === index,
                          isSelected: selectedItem === item,
                          role: 'button',
                        })}
                      >
                        {item.display || item.value}
                      </StyledItem>
                    ))}
                  </StyledDropDownMenu>
                )}
              </div>
            </StyledSelectWrapper>
          </div>
        )}
      />
    );
  }
}

export default Select;
