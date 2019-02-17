import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import IconStar from '../IconStar/IconStar';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';

class Rating extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    numberOfStars: PropTypes.number,
    rating: PropTypes.number,
    newRating: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    numberOfStars: 5,
    rating: 0,
    newRating: null,
  };

  state = {
    hoveredStar: null,
  };

  starColor = (isStarRightHalf, starNumber) => {
    if (this.state.hoveredStar) {
      return this.state.hoveredStar >= starNumber
        ? [ 'primary', ]
        : [ 'neutral', '-5', ];
    }
    if (isStarRightHalf) {
      return this.props.rating >= starNumber - 0.5
        ? [ 'primary', ]
        : [ 'neutral', '-5', ];
    }
    return this.props.rating >= starNumber ? [ 'primary', ] : [ 'neutral', '-5', ];
  };

  render() {
    const { disabled, numberOfStars, newRating, rating, } = this.props;
    const starArr = [];
    // eslint-disable-next-line no-plusplus
    for (let starNumber = 1; starNumber < numberOfStars + 1; starNumber++) {
      starArr.push(
        <FelaComponent
          style={{
            ':hover': { outline: 'none', },
            ':focus': { outline: 'none', },
          }}
          render={({ className, theme: { ratingI18n: { a11yTexts, }, }, }) => (
            <button
              key={`star${starNumber}`}
              type="button"
              className={className}
              onMouseEnter={() => {
                if (!disabled) {
                  this.setState({ hoveredStar: starNumber, });
                }
              }}
              onMouseLeave={() => {
                if (!disabled) {
                  this.setState({ hoveredStar: null, });
                }
              }}
              onClick={() => {
                if (!disabled) {
                  newRating(starNumber);
                }
              }}
            >
              <IconStar
                size={[ { from: 'm', value: 2.5, }, { until: 'm', value: 4, }, ]}
                rightColor={this.starColor(true, starNumber)}
                leftColor={this.starColor(false, starNumber)}
              />
              <VisuallyHidden>
                {a11yTexts.rateAction(starNumber)}
              </VisuallyHidden>
            </button>
          )}
        />
      );
    }
    return (
      <FelaTheme
        render={({ ratingI18n: { a11yTexts, }, }) => (
          <Fragment>
            <VisuallyHidden>
              {a11yTexts.rating(rating)}
            </VisuallyHidden>
            {starArr}
          </Fragment>
        )}
      />
    );
  }
}

export default Rating;
