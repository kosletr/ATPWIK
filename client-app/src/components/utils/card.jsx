import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Rating from "./rating";

export class Card extends Component {
  render() {
    const {
      _id,
      title,
      price,
      shortDesc,
      imageURL,
      owner,
      liked,
      onLike,
      rating,
      onSaveRating,
      onRemoveRating,
    } = this.props;

    return (
      <div className="card" style={{ width: "15rem", height: "30rem" }}>
        <div>
          <div align="left" style={{ marginTop: "2em", marginLeft: "2em" }}>
            <Like _id={_id} onLike={onLike} liked={liked} />
          </div>
          <div align="right" style={{ marginTop: "-22px", marginRight: "1em" }}>
            <span className="badge badge-info">{owner.username}</span>
          </div>
        </div>
        <div
          style={{
            maxWidth: "12rem",
            maxHeight: "17rem",
          }}
        >
          <img
            className="card-img-top"
            src={imageURL}
            alt={title}
            style={{
              marginTop: "22px",
              marginLeft: "22px",
              height: "200px",
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/products/${_id}`} className="card-link">
              {title}
            </Link>
          </h5>
          <p className="card-text">{shortDesc}</p>
          <div align="right">
            <b style={{ color: "green" }}>{price}€</b>
          </div>
        </div>
        <div className="card-footer">
          <Rating
            _id={_id}
            rating={rating}
            onSaveRating={onSaveRating}
            onRemoveRating={onRemoveRating}
          />
        </div>
      </div>
    );
  }
}

export default Card;
