import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Rating from "./rating";
import "./cards.css";

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
      <div className="my-card">
        <div className="my-card-header">
          <span> <Like _id={_id} onLike={onLike} liked={liked} /></span>
          <span className="badge badge-info" style={{ alignSelf: "center" }}>{owner.username}</span>
        </div>
        <div className="my-card-body">
          <div className="my-card-img">
            <img className="my-card-img-top" src={imageURL} alt={title} />
          </div>
          <Link className="my-card-title" to={`/products/${_id}`}>{title}</Link>
          <div className="my-card-description">
            <p>{shortDesc}</p>
          </div>
          <div className="my-card-price">
            <p>{price}€</p>
          </div>
        </div>
        <div className="my-card-footer">
          <Rating _id={_id} rating={rating} onSaveRating={onSaveRating} onRemoveRating={onRemoveRating} />
        </div>
      </div>
    );
  }
}

export default Card;
