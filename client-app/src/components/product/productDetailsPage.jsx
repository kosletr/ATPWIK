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

    if (authService.getCurrentUser() != null) {
      const productId = product._id;

      const { data: like } = await getLikeByProductId(productId);
      product.liked = like.liked;

      const { data: rating } = await getRatingByProductId(productId);
      product.rating = rating.rating;
    }

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
    const { _id, title, price, shortDesc, imageURL, description, liked, rating } = this.state.product;

    return (
      <div className="container" style={{ display: "flex", marginTop: "5rem" }}>
        <div>
          <img src={imageURL} alt={title} style={{ maxWidth: "330px", maxHeight: "330px" }} />
        </div>
        <div style={{ margin: "2rem 2rem 0 4rem", display: "flex", flexDirection: "column" }} >
          <div style={{ display: "flex" }}>
            <h2 style={{ paddingRight: "1rem" }}> {title} </h2>
            <span style={{ paddingTop: "0.6rem" }}>
              <Like _id={_id} onLike={this.handleLike} liked={liked} />
            </span>
          </div>
          <Rating _id={_id} rating={rating}
            onSaveRating={this.handleSaveRating} onRemoveRating={this.handleRemoveRating} />
          <h4 style={{ marginTop: "2rem" }}>Description</h4>
          <p style={{ textAlign: "justify" }}>{description}</p>
          <p> <strong>Price:</strong> {price}€ </p>
        </div>
      </div>
    );
  }
}

export default ProductPage;
