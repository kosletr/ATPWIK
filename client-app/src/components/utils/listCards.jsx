import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import Like from "./like";
import Rating from "./rating";

function ListCards({ data, cardDetails, extraProps }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-card-list">
      {data.map((entry) => {
        const properties = _.pick(entry, cardDetails);
        return (
          <div key={data.indexOf(entry)}>
            <Card {...properties} {...extraProps} />
          </div>
        );
      })}
    </div>
  );
}


function Card({
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
}) {
  return (
    <div className="my-card">
      <div className="my-card-header">
        <span> <Like _id={_id} onLike={onLike} liked={liked} /></span>
        <span className="badge badge-info" style={{ alignSelf: "center" }}>{owner.username}</span>
      </div>
      <div className="my-card-body">
        <Link className="my-card-img" to={`/products/${_id}`}>
          <img className="my-card-img-top" src={imageURL} alt={title} />
        </Link>
        <Link className="my-card-title" to={`/products/${_id}`}>{title}</Link>
        <div className="my-card-description">
          <p>{shortDesc}</p>
        </div>
        <div className="my-card-price">
          <p>{parseFloat(price).toFixed(2)}€</p>
        </div>
      </div>
      <div className="my-card-footer">
        <Rating _id={_id} rating={rating} onSaveRating={onSaveRating} onRemoveRating={onRemoveRating} />
      </div>
    </div>
  );
}

export default ListCards;
