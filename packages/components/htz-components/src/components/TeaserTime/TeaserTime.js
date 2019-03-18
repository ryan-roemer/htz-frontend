// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import differenceInHours from 'date-fns/difference_in_hours';
import Time from '../Time/Time';

type TeaserTimePropTypes = {
  /** className passed on to the Time component */
  className: ?string,
  /** The article publish time in unixtime (ms) */
  publishDate: ?number,
  /** The article last update time in unixtime (ms) */
  lastUpdate: ?number,
  labels: ?{
    pubDateText: string,
    modDateText: string,
  },
};

TeaserTime.defaultProps = {
  className: null,
  publishDate: null,
  lastUpdate: null,
  labels: null,
};
export default function TeaserTime({
  className,
  publishDate,
  lastUpdate,
  labels,
}: TeaserTimePropTypes): React.Node {
  const showModDate = lastUpdate !== publishDate;
  const timeFormat = lastUpdate && isToday(lastUpdate) ? 'HH:mm' : 'DD.MM.YY';
  if (showModDate) {
    return (
      <FelaComponent
        style={theme => ({
          display: 'block',
          extend: [
            theme.mq(
              { until: 's', },
              {
                display: 'flex',
                marginInlineEnd: '1rem',
              }
            ),
          ],
        })}
        render={({ className: wrapperClassName, theme, }) => (
          <div className={wrapperClassName}>
            <FelaComponent
              style={theme => ({
                extend: [
                  theme.mq(
                    { until: 's', },
                    {
                      display: 'flex',
                      marginInlineEnd: '2rem',
                    }
                  ),
                ],
              })}
              render={({ className: labelClassName, theme, }) => (
                <div className={labelClassName}>
                  <Time
                    className={className}
                    format="DD.MM.YY"
                    time={publishDate}
                    {...(labels ? { label: labels.pubDateText, } : {})}
                  />
                </div>
              )}
            />
            <div>
              <Time
                className={className}
                format={timeFormat}
                time={lastUpdate}
                {...(labels ? { label: labels.modDateText, } : {})}
              />
            </div>
          </div>
        )}
      />
    );
  }
  return (
    <Time
      className={className}
      format="DD.MM.YY"
      time={publishDate}
      {...(labels ? { label: labels.pubDateText, } : {})}
    />
  );
}

function isToday(time) {
  return differenceInHours(Date.now(), time) < 24;
}
