import React from 'react';
import toJson from 'enzyme-to-json';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import StyledCheckBox, { CheckBox, } from '../CheckBox'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<CheckBox>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<StyledCheckBox />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with an attrs prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox attrs={{ name: 'customName', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledCheckBox defaultValue />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isDisabled prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledCheckBox isDisabled />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with label prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledCheckBox label="customLabel" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox miscStyles={{ color: 'red', }} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a checked and onChange func passed', () => {
      const onChange = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox checked onChange={onChange} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders handles click events correctly', () => {
      const onClick = jest.fn();
      const output = felaMount(<CheckBox attrs={{ onClick, }} label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(output.state().checked).toBe(true);
    });
    it('renders handles click events correctly when no onClick Func is passed', () => {
      const output = felaMount(<CheckBox label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(output.state().checked).toBe(true);
    });
    it('renders handles click events correctly on a disabled CheckBox', () => {
      const onClick = jest.fn();
      const output = felaMount(<CheckBox isDisabled attrs={{ onClick, }} label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(onClick).toHaveBeenCalledTimes(0);
      expect(output.state().checked).toBe(false);
    });
    it('renders handles focus and blur events correctly', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const output = felaMount(<CheckBox attrs={{ onFocus, onBlur, }} label="labelRed" />);

      expect(output.state().isFocused).toBe(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(output.state().isFocused).toBe(true);
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(output.state().isFocused).toBe(false);
    });
    it('renders handles focus and blur events correctly when no focus and blur functions are passed', () => {
      const output = felaMount(<CheckBox label="labelRed" />);

      expect(output.state().isFocused).toBe(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(output.state().isFocused).toBe(true);
      input.simulate('blur');
      expect(output.state().isFocused).toBe(false);
    });
  });
});
