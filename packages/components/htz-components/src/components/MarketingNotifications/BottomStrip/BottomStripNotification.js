/* global document */
// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import ReactGA from 'react-ga';
import * as style from './BottomStripStyle';
import Button from '../../Button/Button';
import IconClose from '../../Icon/icons/IconClose';
import IconAlefLogoTransparent from '../../Icon/icons/IconAlefLogoTransparent';
import WrappedScroll from '../../Scroll/Scroll';
import ClickArea from '../../ClickArea/ClickArea';

type Props = {
  buttonText: ?string,
  text1: ?string,
  text2: ?string,
  buttonUrl: ?string,
  color: 'yellow' | 'blue' | 'lightblue',
  onSubmit: ?() => void,
};

type State = {
  mode: 'regular' | 'small',
  documentHeight: number,
  shouldRender: boolean,
};

type Color = {
  background: string,
  iconColor: string,
  textColor: string,
};

type Colors = {
  yellow: Object => Color,
  blue: Object => Color,
  lightblue: Object => Color,
};

const colors: Colors = {
  yellow: theme => ({
    background: 'radial-gradient(circle at 53% 48%, #fff17a, #ffe70c)',
    iconColor: theme.color('primary'),
    textColor: theme.color('black'),
  }),
  blue: theme => ({
    background: 'radial-gradient(circle at 53% 48%, #fff17a, #ffe70c)',
    iconColor: theme.color('white'),
    textColor: theme.color('white'),
  }),
  lightblue: theme => ({
    background: 'radial-gradient(circle at 52% 48%, #f2fadf, #97ebe9)',
    iconColor: theme.color('primary'),
    textColor: theme.color('primary'),
  }),
};

export default class BottomStripNotification extends React.Component<Props, State> {
  state = {
    mode: 'regular',
    documentHeight: 0,
    shouldRender: false,
  };

  static defaultProps = {
    buttonText: null,
    text1: null,
    text2: null,
    buttonUrl: null,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ mode: 'small', }), 10000);
    this.setState({
      documentHeight: document.documentElement
        ? document.documentElement.scrollHeight
        : document.body
          ? document.body.scrollHeight
          : 0,
      shouldRender: true,
    });
    ReactGA.ga('ec:addPromo', {
      name: 'Header - Blue Strip',
      id: 'hp-header-blue-strip',
      position: 'Header',
    });
  }

  render(): Node {
    if (!this.state.shouldRender) return null;
    const { buttonText, text1, text2, buttonUrl, color, onSubmit, } = this.props;
    const isSmall = this.state.mode === 'small';
    return (
      <WrappedScroll
        render={({ y, }) => {
          if (y > this.state.documentHeight - 1200) return null;
          return (
            <FelaComponent isSmall={isSmall} color={colors[color]} style={style.wrapper}>
              {({ theme, className, }) => (
                <div className={className}>
                  <FelaComponent
                    isSmall={isSmall}
                    color={colors[color]}
                    style={style.innerWrapper}
                    as="span"
                  >
                    {isSmall ? null : (
                      <ClickArea
                        miscStyles={style.closeButton(theme, isSmall)}
                        onClick={() => this.setState({ mode: 'small', })}
                      >
                        <IconClose />
                      </ClickArea>
                    )}
                    {/* TODO: ADDED style prop, ask if this is correct */}
                    <FelaComponent
                      isSmall={isSmall}
                      color={colors[color]}
                      style={style.textWrapper}
                    >
                      <IconAlefLogoTransparent
                        miscStyles={style.icon(theme, isSmall, colors[color])}
                      />
                    </FelaComponent>
                    <FelaComponent
                      isSmall={isSmall}
                      color={colors[color]}
                      style={style.textWrapper}
                    >
                      {isSmall ? null : (
                        <FelaComponent isSmall={isSmall} color={colors[color]} style={style.text1}>
                          {text1}
                        </FelaComponent>
                      )}
                      <FelaComponent isSmall={isSmall} color={colors[color]} style={style.text2}>
                        {({ className, }) => (
                          <div className={className} dangerouslySetInnerHTML={{ __html: text2, }} />
                        )}
                      </FelaComponent>
                      <Button
                        variant={style.buttonVariant}
                        href={buttonUrl}
                        onClick={onSubmit}
                        miscStyles={style.button(theme, isSmall)}
                      >
                        {buttonText}
                      </Button>
                    </FelaComponent>
                  </FelaComponent>
                </div>
              )}
            </FelaComponent>
          );
        }}
      />
    );
  }
}
