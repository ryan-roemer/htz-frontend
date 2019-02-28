// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { CountdownType, } from '../../flowTypes/CountdownType';

type UnitType = string | number;

Digit.defaultProps = { miscStyles: null, };

function Digit({ digit, miscStyles, }: { digit: number, miscStyles: ?StyleProps, }): Node {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: theme.color('neutral', '-10'),
        padding: '0 0.5rem',
        backgroundImage: `
          linear-gradient(to bottom,
           ${theme.color('neutral', '-10')} 0%,
            ${theme.color('neutral', '-10')} 50%,
             ${theme.color('neutral', '-6')} 50%,
              ${theme.color('neutral', '-10')} 100%)
        `,
        extend: [
          ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
        ],
      })}
      render="span"
    >
      {digit}
    </FelaComponent>
  );
}

function TimeUnit({ unit, }: { unit: UnitType, }): Node {
  const secondDigit = Number(unit) % 10;
  const firstDigit = (Number(unit) - secondDigit) / 10;
  return (
    <FelaComponent
      style={{
        ':not(:last-child)': {
          position: 'relative',
          marginRight: '1.5rem',
          ':after': {
            content: '":"',
            fontWeight: '300',
            position: 'absolute',
            top: '0',
            transform: 'translate(100%, -15%)',
          },
        },
      }}
      render="span"
    >
      <Digit digit={firstDigit} miscStyles={{ marginStart: '2px', }} />
      <Digit digit={secondDigit} />
    </FelaComponent>
  );
}

type EndTimeObj = {
  days: UnitType,
  hours: UnitType,
  minutes: UnitType,
  seconds: UnitType,
};

type State = {
  endTimeObj: EndTimeObj,
  timesUp: boolean,
}

class Countdown extends React.Component<CountdownType, State> {
  componentDidMount() {
    const endTimeObj = this.getTimeObj();
    if (endTimeObj) {
      this.setState({ endTimeObj, });
      setInterval(this.updateEndTime, 1000);
    }
    else {
      this.setState({ timesUp: true, });
    }
  }

  getTimeObj: () => ?EndTimeObj = () => {
    const { props: { endOfTime, }, } = this;
    const now = new Date().getTime();

    if (now > endOfTime) return null;

    const diffTime = endOfTime - now;

    const days = Math.floor(diffTime / 86400000);
    const hours = Math.floor((diffTime - days * 86400000) / 3600000);
    const minutes = Math.floor((diffTime - (days * 86400000 + hours * 3600000)) / 60000);
    const seconds = Math.floor((diffTime - (days * 86400000 + hours * 3600000 + minutes * 60000)) / 1000);

    return {
      days: this.addPrefix(days),
      hours: this.addPrefix(hours),
      minutes: this.addPrefix(minutes),
      seconds: this.addPrefix(seconds),
    };
  };

  // eslint-disable-next-line consistent-return
  updateEndTime: () => void = () => {
    const { endTimeObj, } = this.state;

    if (
      Number(endTimeObj.days) === 0
      && Number(endTimeObj.hours) === 0
      && Number(endTimeObj.minutes) === 0
      && Number(endTimeObj.seconds) === 0
    ) this.setState({ timesUp: true, });

    let seconds;
    let minutes;
    let hours;
    let days;

    seconds = Number(endTimeObj.seconds) - 1;

    if (seconds < 0) {
      seconds = 59;
      minutes = Number(endTimeObj.minutes) - 1;

      if (minutes < 0) {
        minutes = 59;
        hours = Number(endTimeObj.hours) - 1;

        if (hours < 0) {
          hours = 23;
          days = Number(endTimeObj.days) - 1;
        }
      }
    }

    this.setState({
      endTimeObj: {
        days: days != null ? this.addPrefix(days) : endTimeObj.days,
        hours: hours != null ? this.addPrefix(hours) : endTimeObj.hours,
        minutes: minutes != null ? this.addPrefix(minutes) : endTimeObj.minutes,
        seconds: this.addPrefix(seconds),
      },
    });
  };

  addPrefix: number => UnitType = unit => (
    unit < 0
      ? '00'
      : unit < 10
        ? `0${unit}`
        : unit
  );

  render(): Node {
    if (!this.state) return null;

    if (this.state.timesUp) return null;

    const { title, } = this.props;

    const { endTimeObj: { days, hours, minutes, seconds, }, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          fontWeight: '700',
          extend: [
            theme.type(-1, { lines: 4, }),
          ],
        })}
      >
        <FelaComponent
          style={theme => ({
            color: theme.color('quaternary'),
            backgroundColor: theme.color('neutral', '-1'),
            paddingInlineStart: '1rem',
            paddingInlineEnd: '1rem',
          })}
          render="span"
        >
          {title}
        </FelaComponent>
        <FelaComponent
          style={theme => ({
            color: theme.color('neutral', '-1'),
            backgroundColor: theme.color('quaternary'),
            paddingInlineStart: '1rem',
            paddingInlineEnd: '1rem',
            display: 'flex',
          })}
        >
          <div dir="ltr">
            {Number(days) ? <TimeUnit unit={days} /> : null}
            <TimeUnit unit={hours} />
            <TimeUnit unit={minutes} />
            <TimeUnit unit={seconds} />
          </div>
          <FelaComponent
            style={theme => ({
              ...theme.type(-3, { lines: 4, }),
              fontWeight: '300',
              marginRight: '1rem',
            })}
            render="span"
          >
            {Number(days) ? 'ימים' : 'שעות'}
          </FelaComponent>
        </FelaComponent>
      </FelaComponent>
    );
  }
}

export default Countdown;
