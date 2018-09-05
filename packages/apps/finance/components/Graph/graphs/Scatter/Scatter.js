// @flow
import React from 'react';
import type {
  ElementRef,
  Node,
} from 'react';
import { FelaComponent, } from 'react-fela';
import * as d3 from 'd3';

import type { Stats, } from '../../../StockStats/StockStats';

type Stock = [ number, number, string, string, ];

/* eslint-disable react/no-unused-prop-types */
type Props = {
  data: Array<Stock>,
  duration: number,
  theme: Object,
  changeStats: ({ stats: Stats, }) => void,
};
/* eslint-enable react/no-unused-prop-types */

type State= {
  duration: number,
  theme: Object,
  yScale: number => number,
  xScale: number => number,
};

/* SVG frame's settings */
const width = 574;
const height = 308;
const margin = { top: 32, right: 10, bottom: 15, left: 35, };

class Scatter extends React.Component<Props, State> {
  static defaultProps = {
    duration: 1000,
  };

  state = {
    /* Base scales for x & y axis */
    yScale: d3.scaleLinear().range([ height - margin.bottom, margin.top, ]),
    xScale: d3.scaleLinear().range([ margin.left, width - margin.right, ]),
    theme: {},
    duration: 1000,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { data, duration, theme, } = nextProps;
    const { yScale, xScale, } = prevState;

    /* Calculate x & y inner padding */
    // TODO: do this through median difference rather than hard coded
    const yPadding: number = 5;
    const xPadding: number = 0;

    /* Extract the Min & Max points and inset them into the scales combine with the padding */
    xScale.domain([
      0,
      d3.max(data, d => d[0]) + xPadding,
    ]);
    yScale.domain([
      d3.min(data, d => d[1]) - yPadding,
      d3.max(data, d => d[1]) + yPadding,
    ]);

    return {
      yScale,
      xScale,
      duration,
      theme,
    };
  }

  componentDidMount() {
    const { data, } = this.props;
    this.renderGraph(data);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.data !== this.props.data) this.renderGraph(nextProps.data);
    return false;
  }

  midItem: Stock;
  zeroRef: ElementRef<'line'> | null;
  circlesRef: ElementRef<'g'> | null;
  xAxisRef: ElementRef<'g'> | null;
  yAxisRef: ElementRef<'g'> | null;
  lineRef: ElementRef<'line'> | null;
  polyRef: ElementRef<'polygon'> | null;

  /**
   * This function accepts Stock type array, extracts its items and sends them to the parent component.
   * @param stock - An array of stock data to be passed t othe parent component.
   */
  updateStatsState: ?Stock => void = stock => {
    const [ x, y, name, ] = stock || [];
    const stats: Stats = [
      { title: 'מניה', value: name || '', },
      { title: 'מחזור', value: x || '', },
      { title: '% תשואה', value: y || '', },
    ];
    this.props.changeStats({ stats, });
  };

  /* Create graph's axis */
  xAxis = d3.axisTop().scale(this.state.xScale);
  yAxis = d3.axisLeft().scale(this.state.yScale);

  /**
   * This function is in charge of giving the indication line a new X position.
   * @param stock - An array of stock data that the indication line should be pointed at.
   * @param animate - Should the indication line be animated.
   */
  moveLine: (Stock, boolean) => void = (stock, animate) => {
    const [ x, ] = stock;
    const { xScale, theme, duration, } = this.state;
    /* Set transition. */
    const transition = d3.transition().duration(animate ? duration / 2 : null);

    /* Get the X position of the received stock. */
    const positionX: number = xScale(x);

    /* Take the indicator's dotted line, and change it's X position. */
    d3.select(this.lineRef)
      .attr('stroke', theme.color('neutral', '-3'))
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 3')
      .attr('y1', height - margin.bottom)
      .attr('y2', 0)
      .transition(transition)
      .attr('x1', positionX)
      .attr('x2', positionX);

    /* Prepare indicator's triangle's dimensions. */
    const poly = [
      { x: positionX - 15, y: height, },
      { x: positionX, y: height - margin.bottom, },
      { x: positionX + 15, y: height, },
    ];

    /* Change indicator's triangle's X position. */
    d3.select(this.polyRef)
      .data([ poly, ])
      .attr('fill', theme.color('neutral', '-2'))
      .transition(transition)
      .attr('points', points => points.map(point => [ point.x, point.y, ].join(',')).join(' '));

    /* Send the hovered stock and send it's data to the parent component. */
    this.updateStatsState(stock);
  };

  /**
   * This function responsible for rendering and updating the graph.
   * @param data - An Array of stocks to be drawn.
   */
  renderGraph: Array<Stock> => void = data => {
    const { yScale, xScale, duration, } = this.state;
    /* Set transition. */
    const transition = d3.transition().duration(duration);

    /* Find and save the average item
    (the one who'll be rendered closest to the middle of the X axis). */
    const midWidth: number = width / 2;
    this.midItem =
      data.reduce((prev, curr) => {
        const currX: number = xScale(curr[0]);
        const prevX: number = xScale(prev[0]);
        return (
          Math.abs(currX - midWidth) < Math.abs(prevX - midWidth) ? curr : prev
        );
      });

    /* Set the init circles svg elements, and set the animation's key (its index). */
    const circles = d3.select(this.circlesRef)
      .selectAll('circle')
      .data(data, (d, i) => i);

    /* Set the Exit event and animation. */
    circles.exit()
      .transition(transition)
      .attr('r', 0)
      .remove();

    /* Set the Enter event and the init position and radius. */
    const enter = circles
      .enter()
      .append('circle')
      .attr('r', 0)
      .attr('cx', d => xScale(d[0]))
      .attr('cy', yScale(0));

    /* Merge the Enter event with the Update event and animation. */
    enter.merge(circles)
      .style('mix-blend-mode', 'hard-light')
      .on('mouseover', d => {
        this.moveLine(d, false);
      })
      .transition(transition)
      .attr('fill', d => (d[1] > 0 ? '#7ad166' : '#e22134'))
      .attr('r', 5)
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]));

    /* Set the RedLine position and transition. */
    d3.select(this.zeroRef)
      .attr('x1', xScale(xScale.domain()[0]))
      .attr('x2', xScale(xScale.domain()[1]) + margin.right)
      .attr('stroke-width', 1)
      .attr('stroke', 'red')
      .transition(transition)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0));

    this.moveLine(this.midItem, true);
    /* Select the X & Y axis group reference */
    const xAxisRef = d3.select(this.xAxisRef);
    const yAxisRef = d3.select(this.yAxisRef);

    /* Remove the default horizontal axis and its ticks. */
    xAxisRef.call(this.xAxis)
      .selectAll('.tick line, .domain').remove();

    /* Remove the default vertical axis. */
    yAxisRef.call(this.yAxis)
      .select('.domain').remove();

    /* Select all vertical axis ticks. */
    const yAxisLines = yAxisRef.selectAll('.tick line');

    /* Set the Exit event. */
    yAxisLines.exit().remove();

    /* Set the Enter event and the init opacity. */
    const linesEnter = yAxisLines
      .attr('opacity', 0);

    /* Merge the Enter event with the Update event and animation. */
    linesEnter.merge(linesEnter)
      .attr('stroke', '#777')
      .attr('stroke-width', 0.5)
      .attr('x1', 0)
      .attr('x2', width - margin.left)
      .transition(transition)
      .attr('opacity', 1);
  };

  render(): Node {
    return (
      <FelaComponent
        style={theme => ({ backgroundColor: theme.color('neutral', '-1'), })}
        render={({ className, theme, }) => (
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            width="100%"
            direction="ltr"
          >
            <g>
              <line
                ref={zeroRef => this.zeroRef = zeroRef} // eslint-disable-line no-return-assign
              />
            </g>
            <g
              // eslint-disable-next-line no-return-assign
              ref={circlesRef => this.circlesRef = circlesRef}
            />
            <g
              ref={xAxisRef => this.xAxisRef = xAxisRef} // eslint-disable-line no-return-assign
              transform={`translate(0, ${margin.top})`}
              stroke={theme.color('neutral', '-3')}
            />
            <g
              ref={yAxisRef => this.yAxisRef = yAxisRef} // eslint-disable-line no-return-assign
              transform={`translate(${margin.left}, 0)`}
              stroke={theme.color('neutral', '-3')}
            />
            <g>
              <line
                ref={lineRef => this.lineRef = lineRef} // eslint-disable-line no-return-assign
              />
              <polygon
                ref={polyRef => this.polyRef = polyRef} // eslint-disable-line no-return-assign
              />
            </g>
          </svg>
        )}
      />
    );
  }
}

export default Scatter;