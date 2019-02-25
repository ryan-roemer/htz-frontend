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
      this.showAnimation = showAnimationOnDesktop;
    }
  }

  render() {
    const mode = 'horizental';
    return (
      <Observer rootMargin="50px">
        {inView => {
          const load = this.showAnimation ? inView : true;
          return (
            <FelaComponent mode={mode} style={style.wrapper}>
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
                        style={style.legendcolor}
                        as="span"
                      />
                      <FelaComponent style={style.legendLabel} as="span">
                        <span>{legend[0]}</span>
                        <FelaComponent style={style.legendDate} as="span">{legend[1]}</FelaComponent>
                      </FelaComponent>
                    </FelaComponent>
                  );
                })}
              </FelaComponent>
              <FelaComponent mode={mode} style={style.surveyWrapper}>
                {this.items.map(item => (
                  <FelaComponent
                    itemsAmount={this.items.length}
                    mode={mode}
                    key={item}
                    style={style.chartWrapper}
                  >
                    <FelaComponent mode={mode} style={style.labalWrapper} as="label">
                      <FelaComponent mode={mode} style={style.labal} as="label">
                        {item}
                      </FelaComponent>
                    </FelaComponent>
                    <FelaComponent mode={mode} style={style.barsWrapper}>
                      {this.partiesValues[item].map((v, i) => (
                        <FelaComponent
                          mode={mode}
                          key={item + this.colors[i]}
                          style={style.barWrapper}
                        >
                          <FelaComponent
                            mode={mode}
                            barColor={this.colors[i]}
                            value={v}
                            load={load}
                            style={style.bar}
                          />
                          <FelaComponent mode={mode} style={style.barValue}>
                            {v}
                          </FelaComponent>
                        </FelaComponent>
                      ))}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
              <FelaComponent mode={mode} style={style.buttonWrapper}>
                <Button
                  href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451"
                  style={style.button}
                >
                  <FelaTheme>{theme => theme.survey.button}</FelaTheme>
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
