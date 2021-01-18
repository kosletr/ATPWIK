import React, { Component } from "react";
import { getUserProductById } from "../../services/userService";
import Like from "../utils/like";
import Rating from "../utils/rating";
import authService from "../../services/authService";
import {
  getLikeByProductId,
  addLikeToProduct,
  removeLikeFromProduct,
  getRatingByProductId,
  addRatingToProduct,
  removeRatingFromProduct,
} from "../../services/userService";

export class ProductPage extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { data: product } = await getUserProductById(
      this.props.match.params.id
    );

    const productId = product._id;

    const { data: like } = await getLikeByProductId(productId);
    product.liked = like.liked;

    const { data: rating } = await getRatingByProductId(productId);
    product.rating = rating.rating;

    this.setState({ product });
  }

  handleLike = async ({ currentTarget: input }) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }

    const productId = input.id;
    const product = { ...this.state.product };

    product.liked = !product.liked;
    this.setState({ product });

    if (product.liked) await addLikeToProduct(productId);
    else await removeLikeFromProduct(productId);
  };

  handleSaveRating = async (rating, productId) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }

    const product = { ...this.state.product };

    product.rating = rating;
    this.setState({ product });

    await addRatingToProduct(productId, rating);
  };

  handleRemoveRating = async (productId) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }

    const product = { ...this.state.product };

    product.rating = 0;
    this.setState({ product });

    await removeRatingFromProduct(productId);
  };

  render() {
    const {
      _id,
      title,
      price,
      shortDesc,
      imageURL,
      description,
      liked,
      rating,
    } = this.state.product;

    return (
      <div className="row">
        <div className="col-1"></div>
        <div className="col">
          <img
            src={imageURL}
            alt={title}
            style={{ maxWidth: "330px", maxHeight: "330px" }}
          />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <h2
                style={{
                  marginBottom: "1em",
                  display: "block",
                  marginBottom: 0,
                  paddingRight: "95px",
                }}
              >
                {title}
              </h2>
            </div>
            <div className="col">
              <Like _id={_id} onLike={this.handleLike} liked={liked} />
            </div>
          </div>
          <div className="row" style={{ margin: "30px" }}>
            <Rating
              _id={_id}
              rating={rating}
              onSaveRating={this.handleSaveRating}
              onRemoveRating={this.handleRemoveRating}
            />
          </div>
          <div className="row" style={{ marginBottom: "30px" }}>
            <h4>Description</h4>
          </div>
          <div className="row">
            <p>{description}</p>
          </div>
          <div className="row">
            <b>Price</b>: {price}€
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
