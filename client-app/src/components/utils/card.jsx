import React, { Component } from "react";

export class Card extends Component {
  render() {
    const { id, title, shortDesc, liked, imageURL, onLike } = this.props;
    return (
      <div className="card" style={{ width: "17rem" }}>
        <i
          id={id}
          onClick={onLike}
          className={liked ? "like fa fa-heart" : "like fa fa-heart-o"}
          style={{ cursor: "pointer", color: "red" }}
          aria-hidden="true"
        />
        <img
          className="card-img-top"
          src={imageURL}
          alt={title}
          style={{ marginTop: "40px", padding: "15px", height: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            <a href="#" className="card-link">
              {title}
            </a>
          </h5>
          <p className="card-text">{shortDesc}</p>
        </div>
      </div>
    );
  }
}

export default Card;
