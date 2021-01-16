import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Card extends Component {
  render() {
    const {
      _id,
      title,
      price,
      shortDesc,
      imageURL,
      owner,
      onLike,
      likedProductIds,
    } = this.props;

    const liked = likedProductIds.includes(_id);

    return (
      <div className="card" style={{ width: "15rem", height: "30rem" }}>
        <div>
          <div align="left" style={{ marginTop: "2em", marginLeft: "2em" }}>
            <i
              id={_id}
              onClick={onLike}
              className={liked ? "like fa fa-heart" : "like fa fa-heart-o"}
              style={{ cursor: "pointer", color: "red" }}
              aria-hidden="true"
            />
          </div>
          <div align="right" style={{ marginTop: "-22px", marginRight: "1em" }}>
            <span className="badge badge-info">{owner.username}</span>
          </div>
        </div>
        <div align="center">
          <img
            className="card-img-top"
            src={imageURL}
            alt={title}
            style={{
              marginTop: "10px",
              height: "250px",
              width: "200px",
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
      </div>
    );
  }
}

export default Card;
