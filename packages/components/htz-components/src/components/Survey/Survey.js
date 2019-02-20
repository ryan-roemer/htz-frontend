/* global window */
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import orderBy from 'lodash/orderBy';
import Observer from 'react-intersection-observer';

import style from './style';
import Button from '../Button/Button';

// eslint-disable-next-line react/prop-types
export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const properties = props.properties;
    // eslint-disable-next-line react/prop-types
    if (!properties) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls.surveys) return null;

    this.xls = properties.xls;
    this.partiesValues = {};
    let unsortedItems;
    this.colors = [ [ 'primary', ], [ 'primary', '-3', ], [ 'quaternary', '+2', ], [ 'black', ], ];

    const {
      comment,
      showAnimationOnMobile,
      showAnimationOnDesktop,
      showAnimationOntablet,
      mobileMode,
      tabletMode,
      desktopMode,
      legend,
      ...data
    } = this.xls.surveys ? this.xls.surveys[0] : this.xls.survey;
    this.comment = comment;
    this.showAnimation = showAnimationOnDesktop;
    if (this.xls.surveys) {
      unsortedItems = Object.keys(data);
      // eslint-disable-next-line array-callback-return
      unsortedItems.map(v => {
        this.partiesValues[v] = [];
      });

      // eslint-disable-next-line array-callback-return
      this.xls.surveys.map(item => {
        unsortedItems.map(v => this.partiesValues[v].push(parseInt(item[v], 10)));
      });

      this.items = orderBy(unsortedItems, v => this.partiesValues[v][0], [ 'desc', ]);
<<<<<<< HEAD
=======
      this.showAnimation = showAnimationOnDesktop;
>>>>>>> fix(survey): make the b tag felacomponent
    }
  }

  render() {
    const mode = 'horizental';
    return (
      <Observer rootMargin="50px">
        {inView => {
          const load = this.showAnimation ? inView : true;
          return (
            <FelaComponent mode={mode} rule={style.wrapper}>
              <FelaComponent style={style.legendsWrapper}>
                {this.xls.surveys.map((v, i) => {
                  const legend = v.legend.split(',').map(v => v.trim());
                  if (legend[1]) {
                    legend[0] += ', ';
                  }
                  return (
                    <FelaComponent style={style.legend} key={this.colors[i]}>
                      <FelaComponent
                        color={this.colors[i]}
                        rule={style.legendcolor}
                        render="span"
                      />
                      <FelaComponent style={style.legendLabel} render="span">
                        <span>{legend[0]}</span>
<<<<<<< HEAD
                        <b>{legend[1]}</b>
=======
                        <FelaComponent style={style.legendDate}>{legend[1]}</FelaComponent>
>>>>>>> fix(survey): make the b tag felacomponent
                      </FelaComponent>
                    </FelaComponent>
                  );
                })}
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.surveyWrapper}>
                {this.items.map(item => (
                  <FelaComponent
                    itemsAmount={this.items.length}
                    mode={mode}
                    key={item}
                    rule={style.chartWrapper}
                  >
                    <FelaComponent mode={mode} rule={style.labalWrapper} render="label">
                      <FelaComponent mode={mode} rule={style.labal} render="label">
                        {item}
                      </FelaComponent>
                    </FelaComponent>
                    <FelaComponent mode={mode} rule={style.barsWrapper}>
                      {this.partiesValues[item].map((v, i) => (
                        <FelaComponent
                          mode={mode}
                          key={item + this.colors[i]}
                          rule={style.barWrapper}
                        >
                          <FelaComponent
                            mode={mode}
                            barColor={this.colors[i]}
                            value={v}
                            load={load}
                            rule={style.bar}
                          />
                          <FelaComponent mode={mode} rule={style.barValue}>
                            {v}
                          </FelaComponent>
                        </FelaComponent>
                      ))}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.buttonWrapper}>
                <Button
                  href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451"
                  style={style.button}
                >
                  <FelaTheme render={theme => theme.survey.button} />
                </Button>
              </FelaComponent>

              <FelaComponent style={style.comment}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.comment.replace('*', '<br>*'),
                  }}
                />
              </FelaComponent>
            </FelaComponent>
          );
        }}
      </Observer>
    );
  }
}
