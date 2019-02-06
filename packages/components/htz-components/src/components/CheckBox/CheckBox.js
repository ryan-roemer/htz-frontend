import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { borderRight, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import Note from '../Note/Note';
import Ripple from '../Animations/Ripple';

const styles = ({ miscStyles, theme, }) => ({
  display: 'flex',
  alignItems: 'baseline',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const checkBoxStyle = ({ checked, isDisabled, isFocused, variant, theme, }) => ({
  position: 'relative',
  height: '2rem',
  width: '2rem',
  flexShrink: 0,
  backgroundColor: checked
    ? theme.color('checkBox', `${variant}BgChecked`)
    : theme.color('checkBox', `${variant}Bg`),
  transitionProperty: 'all',
  borderWidth: isFocused && !checked ? '2px' : '1px',
  borderStyle: 'solid',
  borderColor: isDisabled
    ? theme.color('checkBox', `${variant}BorderDisabled`)
    : theme.color('checkBox', `${variant}Border`),
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  extend: [ theme.getTransition(1, 'swiftIn'), ],
});

const StyledCheckBox = createComponent(checkBoxStyle, 'div', [ 'aria-hidden', ]);

const checkStyle = ({ checked, variant, theme, }) => ({
  height: '100%',
  width: '50%',
  backgroundColor: 'transparent',
  transform: 'rotate(35deg) translate(-45%, 0%)',
  overflow: 'hidden',
  opacity: checked ? 1 : 0,
  transitionProperty: 'all',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.color('checkBox', `${variant}Check`),
  extend: [
    borderRight('2px', 'solid', theme.color('checkBox', `${variant}Check`)),
    theme.getTransition(1, 'swiftIn'),
  ],
});

const StyledCheck = createComponent(checkStyle);

const spanStyle = ({ theme, miscStyles, }) => ({
  marginInlineStart: '0.3em',
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export class CheckBox extends Component {
  static propTypes = {
    /**
     * An object of attrbutes to set on the DOM element.
     * Passed to the underlying label element wrapping the checkbox input in this component
     */
    attrs: attrsPropType,
    /**
     * Is the checkBox checked
     * Should never be passed manually by the consumer, but rather
     * set by the controlling component.
     */
    checked: PropTypes.bool,
    /** Class(es) to be added to the DOM element.
     * Automatically generated by Fela, do not enter manually.
     */
    className: PropTypes.string,
    /**
     * The checkBoxId that connects the label for with the checkBox,
     * if no checkBoxId is provided, and checkBoxId will be generated automatically
     */
    checkBoxId: PropTypes.string,
    /**
     * The default checked value of an unconrolled checkbox
     */
    defaultValue: PropTypes.bool,
    /** error note to display if input is passed a `isError` prop */
    errorText: PropTypes.string,
    /**
     * Is The checkBox disabled
     */
    isDisabled: PropTypes.bool,
    /** Is this input in error state */
    isError: PropTypes.bool,
    /**
     * The label text/node associated with the checkbox
     */
    label: PropTypes.oneOfType([ PropTypes.string, PropTypes.node, ]),
    /**
     * miscStyles of the label
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
    /**
     * miscStyles of the label
     * A special property holding miscellaneous CSS values that
     * trump all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    labelStyle: stylesPropType,
    /**
     * Id used to connect the note to input with aria-describedby for a11y reasons,
     * default will generate random id
     */
    noteId: PropTypes.string,
    /** Note explaining the CheckBox field  */
    noteText: PropTypes.string,
    /**
     * A callback that gets called when the CheckBox is Blurred
     * @param {SyntheticEvent} evt - The event object
     */
    onBlur: PropTypes.func,
    /**
     * A callback that gets the event that holds new checked value of the checkbox
     * used to update state of parent when using as react controlled checkbox
     * @param {SyntheticEvent} evt - The event object
     */
    onChange: PropTypes.func,
    /**
     * A callback that gets called when the CheckBox is clicked
     * @param {SyntheticEvent} evt - The event object
     */
    onClick: PropTypes.func,
    /**
     * A callback that gets called when the CheckBox is focused
     * @param {SyntheticEvent} evt - The event object
     */
    onFocus: PropTypes.func,
    /**
     * A callback function to allow parent component to get ref of input,
     * example use case: focusing the input.
     */
    refFunc: PropTypes.func,
    /** The `<CheckBox />`'s stylistic variant */
    variant: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          ...responsivePropBaseType,
          value: PropTypes.string.isRequired,
        })
      ),
    ]),
  };

  static defaultProps = {
    attrs: null,
    checked: null,
    className: null,
    checkBoxId: null,
    defaultValue: false,
    errorText: null,
    isDisabled: false,
    isError: false,
    label: null,
    miscStyles: null,
    labelStyle: null,
    noteId: null,
    noteText: null,
    onBlur: null,
    onChange: null,
    onClick: null,
    onFocus: null,
    refFunc: undefined,
    variant: 'primary',
  };

  state = {
    checkBoxId: this.props.checkBoxId || Math.random().toString(),
    ...(this.props.checked === null
      ? { checked: this.props.defaultValue, }
      : {}),
    isFocused: false,
    noteId: this.props.noteId
      ? this.props.noteId
      : this.props.errorText || this.props.noteText
        ? Math.random().toString()
        : null,
  };

  render() {
    const {
      attrs,
      checked,
      className,
      errorText,
      isDisabled,
      isError,
      label,
      noteText,
      onBlur,
      onChange,
      labelStyle,
      onClick,
      onFocus,
      refFunc,
      variant,
    } = this.props;

    const controllingChecked = checked !== null ? checked : this.state.checked;

    return (
      <div>
        <label
          htmlFor={this.state.checkBoxId}
          className={className}
          {...(refFunc ? { ref: el => refFunc(el), } : {})}
        >
          <input
            type="checkbox"
            {...(this.state.noteId
              ? { 'aria-describedby': this.state.noteId, }
              : {})}
            {...attrs}
            checked={controllingChecked}
            {...(isDisabled ? { disabled: true, } : {})}
            id={this.state.checkBoxId}
            onBlur={evt => {
              this.setState((prevState, props) => ({
                isFocused: false,
              }));
              if (onBlur) onBlur(evt);
            }}
            onChange={evt => {
              if (!isDisabled) {
                if (checked === null) {
                  this.setState((prevState, props) => ({
                    checked: !prevState.checked,
                  }));
                }
                if (onChange) onChange(evt);
              }
            }}
            {...(onClick ? { onClick, } : {})}
            onFocus={evt => {
              this.setState((prevState, props) => ({
                isFocused: true,
              }));
              if (onFocus) onFocus(evt);
            }}
          />
          <StyledCheckBox
            aria-hidden="true"
            checked={controllingChecked}
            isDisabled={isDisabled}
            isFocused={this.state.isFocused}
            variant={variant}
          >
            <FelaComponent
              render={({ theme, }) => (
                <Ripple
                  isActive={this.state.isFocused}
                  bgColor={theme.color('checkBox', `${variant}Ripple`)}
                />
              )}
            />
            <StyledCheck checked={controllingChecked} variant={variant} />
          </StyledCheckBox>
          <FelaComponent rule={spanStyle} miscStyles={labelStyle}>
            {label}
          </FelaComponent>
        </label>
        {errorText || noteText ? (
          <Note
            text={isError ? errorText : noteText}
            isError={isError}
            noteId={this.state.noteId}
          />
        ) : null}
      </div>
    );
  }
}

export default createComponent(styles, CheckBox, [
  'attrs',
  'checked',
  'checkBoxId',
  'defaultValue',
  'errorText',
  'isDisabled',
  'isError',
  'label',
  'labelStyle',
  'noteText',
  'noteId',
  'onBlur',
  'onChange',
  'onClick',
  'onFocus',
  'refFunc',
  'variant',
]);
