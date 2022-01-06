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
  rating
}) {

  const [sumOfRatings, ratingsCount] = rating;

  return (
    <div className="my-card">
      <div className="my-card-header">
        <span> <Like _id={_id} onLike={onLike} liked={liked} /></span>
        <span className="badge badge-info" style={{ alignSelf: "center" }}>{owner.username}</span>
      </div>
      <div className="my-card-body">
        <Link  onClick={() => window.scrollTo(0, 0)} className="my-card-img" to={`/products/${_id}`}>
          <img className="my-card-img-top" src={imageURL} alt={title} />
        </Link>
        <Link onClick={() => window.scrollTo(0, 0)} className="my-card-title" to={`/products/${_id}`}>{title}</Link>
        <div className="my-card-description">
          <p>{shortDesc}</p>
        </div>
        <div className="my-card-price">
          <p>{parseFloat(price).toFixed(2)}€</p>
        </div>
      </div>
      <div className="my-card-footer">
        <Rating _id={_id} rating={ratingsCount > 0 ? Math.round(sumOfRatings / ratingsCount) : 0} hoverEnabled={false} />
        <span
          style={{ cursor: "pointer", fontSize: "0.9rem", color: "#707070", margin: "0 0 0 4px" }}
        >
          {ratingsCount > 0 ? `(${ratingsCount})` : ""}
        </span>
      </div>
    </div>
  );
}

export default ListCards;
