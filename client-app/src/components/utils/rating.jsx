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

  deleteButton = (rating) => {
    if (!rating) return null;
    const { onRemoveRating, _id } = this.props;
    return (
      <div
        className="badge badge-danger rounded-circle"
        style={{
          cursor: "pointer",
          paddingBottom: "4px",
          paddingRight: "5px",
          marginLeft: "5px",
          marginBottom: "3px",
        }}
        onClick={() => onRemoveRating(_id)}
      >
        x
      </div>
    );
  };

  render() {
    const { hoverRating } = this.state;
    const { _id, rating, onSaveRating } = this.props;

    return (
      <div className="row">
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
            />
          );
        })}
        {this.deleteButton(rating)}
      </div>
    );
  }
}

export default Rating;
