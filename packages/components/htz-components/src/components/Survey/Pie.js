// @flow
import React from 'react';
import type { Node, } from 'react';
import Observer from 'react-intersection-observer';
import { FelaComponent, FelaTheme, } from 'react-fela';
import style from './style';
import H from '../AutoLevels/H';

type Props = {
  leftWingedColor: String,
  rightWingedColor: string,
  strokeWidth: number,
  rightValue: number,
  leftValue: number,
};

Pie.defaultProps = {
  leftWingedColor: 'blue',
  rightWingedColor: 'red',
  strokeWidth: 100,
};

function calcPieValue(rightValue, leftValue, fullCircle): number {
  const percentage = (rightValue / (rightValue + leftValue)) * 100;
  return (fullCircle * percentage) / 100;
}

export default function Pie({
  leftWingedColor,
  rightWingedColor,
  strokeWidth,
  rightValue,
  leftValue,
}: Props): Node {
  const strokeDashArray = 2 * Math.PI * strokeWidth;
  const fullCircle = strokeDashArray / 2;
  const pieValue = calcPieValue(rightValue, leftValue, fullCircle);
  return (
    <FelaTheme
      render={theme => (
        <Observer rootMargin="50px">
          {inView => (
            <FelaComponent
              style={{
                width: '100%',
                height: '100%',
                paddingTop: '4rem',
              }}
            >
              <H>{theme.surveyPie.title}</H>
              <FelaComponent style={style.legendsWrapper}>
                <FelaComponent style={style.legend}>
                  <FelaComponent color={rightWingedColor} rule={style.legendcolor} render="span" />
                  <FelaComponent style={style.legendLabel} render="span">
                    <span>{theme.surveyPie.redLegend}</span>
                  </FelaComponent>
                </FelaComponent>
                <FelaComponent style={style.legend}>
                  <FelaComponent color={leftWingedColor} rule={style.legendcolor} render="span" />
                  <FelaComponent style={style.legendLabel} render="span">
                    <span>{theme.surveyPie.blueLegend}</span>
                  </FelaComponent>
                </FelaComponent>
              </FelaComponent>

              <FelaComponent
                style={{
                  textAlign: 'start',
                  marginInlioneStart: '4rem',
                }}
              >
                <FelaComponent
                  style={theme => ({
                    position: 'relative',
                    display: 'inline-block',
                    color: theme.color('white'),
                  })}
                >
                  <FelaComponent
                    style={theme => ({
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      left: '25%',
                      ...theme.type(2),
                      zIndex: theme.getZIndex('above'),
                    })}
                  >
                    {leftValue}
                  </FelaComponent>
                  <FelaComponent
                    style={theme => ({
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(50%, -50%)',
                      right: '25%',
                      ...theme.type(2),
                      zIndex: theme.getZIndex('above'),
                    })}
                  >
                    {rightValue}
                  </FelaComponent>
                  <svg
                    style={{
                      backgroundColor: leftWingedColor,
                      borderRadius: '50%',
                      transform: 'rotate(-90deg)',
                    }}
                    width={`${strokeWidth * 2}`}
                    height={strokeWidth * 2}
                  >
                    <circle
                      id="circle"
                      style={{ transitionProperty: 'stroke-dasharray', transitionDuration: '.5s', }}
                      strokeWidth={strokeWidth}
                      r={strokeWidth / 2}
                      cx={strokeWidth}
                      cy={strokeWidth}
                      strokeDasharray={`${inView ? pieValue : 0} ${strokeDashArray}`}
                      fill={leftWingedColor}
                      stroke={rightWingedColor}
                    />
                  </svg>
                </FelaComponent>
              </FelaComponent>
            </FelaComponent>
          )}
        </Observer>
      )}
    />
  );
}
