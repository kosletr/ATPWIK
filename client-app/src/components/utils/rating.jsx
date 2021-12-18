import React, { Component } from "react";
import RatingStar from "./ratingStar";

export class Rating extends Component {
  state = {
    hoverRating: 0,
  };

  onMouseEnter = (index) => {
    this.setState({ hoverRating: index });
  };

  onMouseLeave = () => {
    this.setState({ hoverRating: 0 });
  };

  render() {
    const { hoverRating } = this.state;
    const { _id, rating, onSaveRating, onRemoveRating } = this.props;

    return (
      <div>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <RatingStar
              _id={_id}
              key={index}
              index={index}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onSaveRating={onSaveRating}
              onRemoveRating={onRemoveRating}
            />
          );
        })}
      </div>
    );
  }
}

export default Rating;
