import React, { useEffect, useState } from "react";
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
import { useHistory, useParams } from "react-router-dom";

export function ProductPage() {
  const params = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});

  useEffect(async () => {
    const { data: receivedProduct } = await getUserProductById(params.id);
    setProduct(receivedProduct);
    if (authService.getCurrentUser() == null) return;
    const productId = receivedProduct._id;
    const { data: { liked } } = await getLikeByProductId(productId);
    const { data: { rating } } = await getRatingByProductId(productId);
    setProduct({ ...receivedProduct, liked, rating });
  }, []);

  const handleLike = async ({ currentTarget: input }) => {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }
    setProduct({ ...product, liked: !product.liked });
    const productId = input.id;
    await (!product.liked)
      ? addLikeToProduct(productId)
      : removeLikeFromProduct(productId);
  };

  const handleSaveRating = async (rating, productId) => {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }
    setProduct({ ...product, rating })
    await addRatingToProduct(productId, rating);
  };

  const handleRemoveRating = async (productId) => {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }
    setProduct({ ...product, rating: 0 });
    await removeRatingFromProduct(productId);
  };

  const { _id, title, price, shortDesc, imageURL, description, liked, rating } = product;

  return (
    <div className="container" style={{ display: "flex", marginTop: "5rem" }}>
      <div>
        <img src={imageURL} alt={title} style={{ maxWidth: "330px", maxHeight: "330px" }} />
      </div>
      <div style={{ margin: "2rem 2rem 0 4rem", display: "flex", flexDirection: "column" }} >
        <div style={{ display: "flex" }}>
          <h2 style={{ paddingRight: "1rem" }}> {title} </h2>
          <span style={{ paddingTop: "0.6rem" }}>
            <Like _id={_id} onLike={handleLike} liked={liked} />
          </span>
        </div>
        <Rating _id={_id} rating={rating}
          onSaveRating={handleSaveRating} onRemoveRating={handleRemoveRating} />
        <h4 style={{ marginTop: "2rem" }}>Description</h4>
        <p style={{ textAlign: "justify" }}>{description}</p>
        <p> <strong>Price:</strong> {price}€ </p>
        <button
          onClick={() => alert("Not implemented yet.")}
          style={{ width: "100px" }}
          className="btn btn-primary btn-sm">Buy
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
