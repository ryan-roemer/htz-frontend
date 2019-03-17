// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import orderBy from 'lodash/orderBy';
import Observer from 'react-intersection-observer';
import style from './style';
import Button from '../Button/Button';
import Pie from './Pie';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

type SurveyData = {
  comment: string,
  showAnimationOnDesktop: ?boolean,
  legend: string,
  showAnimationOnMobile: ?boolean,
  showAnimationOntablet: ?boolean,
  mobileMode: ?boolean,
  tabletMode: ?boolean,
  desktopMode: ?boolean,
};

type Xls = {
  surveys: Array<SurveyData>,
  survey: SurveyData,
};

type properties = {
  xls: Xls,
};

type Props = {
  properties: properties,
};

type Block = {
  R: number,
  L: number,
};

function roundToDecimalPrecision(num: number, precision: number): number {
  const multiplier = 10 ** precision;
  return Math.round(num * multiplier) / multiplier;
}

function preperGraphInformation(
  xls: Xls,
  unsortedParties: Array<string>,
  partiesSide: Object
): Array<any> {
  const blocks = [];
  const partiesValues = {};
  let maxValue = 0;
  xls.surveys.forEach((survey, k) => {
    blocks[k] = { R: 0, L: 0, };
    unsortedParties.forEach(v => {
      let partyValue;
      if (Object.keys(partiesSide).length) {
        const side = partiesSide[v];
        partyValue = roundToDecimalPrecision(survey[`${v}|${side}`], 1);
        blocks[k][side] += partyValue;
      }
      else {
        partyValue = roundToDecimalPrecision(survey[v], 1);
      }
      maxValue = Math.max(maxValue, partyValue);
      if (!partiesValues[v]) partiesValues[v] = [];
      partiesValues[v].push(partyValue);
    });
  });
  return [ blocks, partiesValues, maxValue, ];
}

function parseDate(legendSource: string): Array<string> {
  // eslint-disable-next-line prefer-const
  let [ legend, date, ] = legendSource.split(',').map(v => v.trim());
  if (date) {
    legend += ', ';
  }
  return [ legend, date, ];
}

function isValidPieData(blocks: Array<Block>): boolean {
  return blocks[0].R + blocks[0].L === 120;
}

export default function Survey(props: Props): Node {
  const properties = props.properties;
  if (!(properties && properties.xls && (properties.xls.survey || properties.xls.surveys))) return null;
  const xls = properties.xls;
  const colors = [ [ 'primary', ], [ 'primary', '-3', ], [ 'quaternary', '+2', ], [ 'black', ], ];
  const {
    showAnimationOnMobile,
    showAnimationOntablet,
    mobileMode,
    tabletMode,
    desktopMode,
    // This is all that we actually need,
    // all of the above is legacy cruft
    legend,
    comment,
    showAnimationOnDesktop: showAnimation,
    ...sourceParties
  } = xls.surveys ? xls.surveys[0] : xls.survey;

  const partiesSide = {};

  const unsortedParties = Object.keys(sourceParties).map(item => {
    const [ party, side, ] = item.split('|');
    if (side) partiesSide[party] = side;
    return party;
  });

  const [ blocks, partiesValues, maxValue, ] = preperGraphInformation(
    xls,
    unsortedParties,
    partiesSide
  );
  const items = orderBy(unsortedParties, party => partiesValues[party][0], [ 'desc', ]);
  const mode = 'horizental';
  return (
    <React.Fragment>
      <Observer rootMargin="20px">
        {inView => {
          const load = showAnimation ? inView : true;
          return (
            <FelaComponent mode={mode} rule={style.wrapper}>
              <FelaComponent style={style.legendsWrapper}>
                {xls.surveys.map((v, i) => {
                  const [ legend, date, ] = parseDate(v.legend);
                  return (
                    <FelaComponent style={style.legend} key={colors[i][0] + colors[i][1]}>
                      <FelaComponent color={colors[i]} rule={style.legendcolor} render="span" />
                      <FelaComponent style={style.legendLabel} render="span">
                        <span>{legend}</span>
                        <FelaComponent style={style.legendDate} render="span">
                          {date}
                        </FelaComponent>
                      </FelaComponent>
                    </FelaComponent>
                  );
                })}
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.surveyWrapper}>
                {items.map(item => (
                  <FelaComponent
                    itemsAmount={items.length}
                    mode={mode}
                    key={item}
                    rule={style.chartWrapper}
                  >
                    <FelaComponent
                      mode={mode}
                      rule={style.labalWrapper}
                      render={({ className, }) => <span className={className}>{item}</span>}
                    />

                    <FelaComponent mode={mode} rule={style.barsWrapper}>
                      {partiesValues[item].map((v, i) => (
                        <FelaComponent mode={mode} key={item + colors[i]} rule={style.barWrapper}>
                          <FelaComponent
                            mode={mode}
                            barColor={colors[i]}
                            value={Math.max(v, 1) / maxValue * 100}
                            load={load}
                            rule={style.bar}
                          />
                          <FelaComponent mode={mode} rule={style.barValue}>
                            <VisuallyHidden>{`${xls.surveys[i].legend} ${item}`}</VisuallyHidden>
                            {v}
                          </FelaComponent>
                        </FelaComponent>
                      ))}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
            </FelaComponent>
          );
        }}
      </Observer>
      {isValidPieData(blocks) ? (
        <FelaTheme
          render={theme => (
            <Pie
              rightValue={blocks[0].R}
              leftValue={blocks[0].L}
              leftWingedColor={theme.color('primary', '-1')}
              rightWingedColor={theme.color('tertiary', '-1')}
            />
          )}
        />
      ) : null}
      <FelaComponent mode={mode} rule={style.buttonWrapper}>
        <Button href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451" style={style.button}>
          <FelaTheme render={theme => theme.survey.button} />
        </Button>
      </FelaComponent>

      <FelaComponent style={style.comment}>
        <div
          dangerouslySetInnerHTML={{
            __html: comment.replace('*', '<br>*'),
          }}
        />
      </FelaComponent>
    </React.Fragment>
  );
}
