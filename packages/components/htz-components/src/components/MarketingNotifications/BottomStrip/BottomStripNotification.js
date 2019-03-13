// @flow
//
/* global document */
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import ReactGA from 'react-ga';
import * as style from './BottomStripStyle';
import Button from '../../Button/Button';
import IconClose from '../../Icon/icons/IconClose';
import IconAlefLogoTransparent from '../../Icon/icons/IconAlefLogoTransparent';
import useScrollYPosition from '../../../hooks/useScrollYPosition';
import ClickArea from '../../ClickArea/ClickArea';
import BlockLink from '../../BlockLink/BlockLink';

type Props = {
  buttonText: ?string,
  text1: ?string,
  text2: ?string,
  buttonUrl: ?string,
  color: 'yellow' | 'blue' | 'lightblue',
  onSubmit: ?() => void,
};

type State = {
  documentHeight: number,
  shouldRender: boolean,
};

type ModeState = 'regular' | 'small';

type ContentProps = Props & { shouldRender: boolean, mode: ModeState, };

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

BottomStripNotification.defaultProps = {
  buttonText: null,
  text1: null,
  text2: null,
  buttonUrl: null,
};
export default function BottomStripNotification(props: Props): React.Node {
  const { y, } = useScrollYPosition();
  const [ state: State, setState, ] = React.useState({
    documentHeight: 0,
    shouldRender: false,
  });
  const [ mode: ModeState, setMode, ] = React.useState('regular');

  React.useEffect(() => {
    const shrinkTimer = setTimeout(() => setMode('small'), 10000);
    const documentHeight = (document && document.documentElement && document.documentElement.scrollHeight) || 0;
    setState({
      documentHeight,
      shouldRender: y > documentHeight - 1200,
    });
    ReactGA.ga('ec:addPromo', {
      name: 'Header - Blue Strip',
      id: 'hp-header-blue-strip',
      position: 'Header',
    });

    return clearTimeout(shrinkTimer);
  }, []);

  const Content = React.memo(
    ({
      shouldRender,
      mode,
      buttonText,
      text1,
      text2,
      buttonUrl,
      color,
      onSubmit,
    }: ContentProps): React.Node => {
      if (shouldRender) return null;
      const isSmall = mode === 'small';

      return (
        <FelaTheme
          render={theme => (
            <BlockLink
              href={buttonUrl}
              miscStyles={style.wrapper({ isSmall, theme, color: colors[color], })}
            >              
                <FelaComponent
                  isSmall={isSmall}
                  color={colors[color]}
                  rule={style.innerWrapper}
                  render="span"
                >
                  {isSmall ? null : (
                    <ClickArea
                      miscStyles={style.closeButton(theme, isSmall)}
                      onClick={() => setMode('small')}
                    >
                      <IconClose />
                    </ClickArea>
                  )}
                  <FelaComponent isSmall={isSmall} color={colors[color]}>
                    <IconAlefLogoTransparent
                      miscStyles={style.icon(theme, isSmall, colors[color])}
                    />
                  </FelaComponent>
                  <FelaComponent isSmall={isSmall} color={colors[color]} rule={style.textWrapper}>
                    {isSmall ? null : (
                      <FelaComponent isSmall={isSmall} color={colors[color]} rule={style.text1}>
                        {text1}
                      </FelaComponent>
                    )}
                    <FelaComponent
                      isSmall={isSmall}
                      color={colors[color]}
                      rule={style.text2}
                      render={({ className, }) => (
                        <div className={className} dangerouslySetInnerHTML={{ __html: text2, }} />
                      )}
                    />
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
            </BlockLink>
          )}
        />
      );
    }
  );

  return <Content shouldRender={state.shouldRender} mode={mode} {...props} />;
}
