// @flow
import * as React from 'react';
import { type StyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import ClickArea from '../ClickArea/ClickArea';

type MastheadButtonProps = {
  direction: 'row' | 'reverse',
  tagName: ?string,
  icon: ?React.ElementType,
  iconMiscStyles: ?StyleProps,
  text: ?string,
  textMiscStyles: ?StyleProps,
};

const textRule = ({ theme, miscStyles, }) => ({ color: 'transparent', });

export default function MastheadButton(props: MastheadButtonProps) {
  const { iconMiscStyles, textMiscStyles, icon: Icon, text, tagName, } = props;

  return (
    <ClickArea>
      {Icon ? <Icon miscStyles={iconMiscStyles} /> : null}
      <FelaComponent style={textRule} miscStyles={textMiscStyles}>{({ theme, className, }) => <div className={className}>{text}</div>}</FelaComponent>
    </ClickArea>
  );
}

MastheadButton.defaultProps = {
  direction: 'row',
  tagName: 'button',
  icon: null,
  iconMiscStyles: null,
  text: null,
};
