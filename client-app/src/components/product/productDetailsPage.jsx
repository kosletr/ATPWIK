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

  useEffect(() => {
    (async function () {
      const { data: receivedProduct } = await getUserProductById(params.id);
      setProduct(receivedProduct);
      if (authService.getCurrentUser() == null) return;
      const productId = receivedProduct._id;
      const { data: { liked } } = await getLikeByProductId(productId);
      const { data: { rating } } = await getRatingByProductId(productId);
      setProduct({ ...receivedProduct, liked, rating });
    })();
  }, [params.id]);

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

  const { _id, title, price, imageURL, description, liked, rating } = product;

  return (
    <div className="product-details-page">
      <img className="product-details-image" src={imageURL} alt={title} />
      <div className="product-details-body">
        <div className="product-details-header">
          <h2>{title}</h2>
          <span>
            <Like _id={_id} onLike={handleLike} liked={liked} />
          </span>
        </div>
        <div className="product-details-description">
          <Rating _id={_id} rating={rating}
            onSaveRating={handleSaveRating} onRemoveRating={handleRemoveRating} />
          <h4>Description</h4>
          <p>{description}</p>
        </div>
        <div className="product-details-buy">
          <button className="btn btn-primary"
            onClick={() => alert("Not implemented yet.")}
          > Buy now
          </button>
          <p> <strong>Price:</strong> {price}€ </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
