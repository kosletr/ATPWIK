import React, { useEffect, useState } from "react";
import { getUserProductById } from "../../services/userService";
import Like from "../utils/like";
import Rating from "../utils/rating";
import CommentSection from "../utils/commentSection";
import authService from "../../services/authService";
import {
  getLikeByProductId,
  addLikeToProduct,
  removeLikeFromProduct,
  getRatingByProductId,
  addRatingToProduct,
  removeRatingFromProduct,
  getCommentsByProductId,
  getRatingStatsById,
} from "../../services/userService";
import { useHistory, useParams } from "react-router-dom";

export function ProductPage() {
  const params = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);

  const [ratingChanged, setRatingChanged] = useState(false);

  useEffect(() => {
    (async function () {
      const { data: receivedProduct } = await getUserProductById(params.id);
      const productId = receivedProduct._id;
      const { data: receivedComments } = await getCommentsByProductId(productId);
      setProduct(receivedProduct);
      setComments(receivedComments);
      if (authService.getCurrentUser() == null) return;
      const { data: { liked } } = await getLikeByProductId(productId);
      const { data: { rating } } = await getRatingByProductId(productId);
      const { data: ratingStats } = await getRatingStatsById(productId);

      setRatingChanged(false);

      setProduct({
        ...receivedProduct,
        liked,
        userRating: rating,
        ratingStats
      });

    })();
  }, [params.id, ratingChanged]);

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
    setProduct({ ...product, userRating: rating });
    await addRatingToProduct(productId, rating);
    setRatingChanged(true);
  };

  const handleRemoveRating = async (productId) => {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }
    setProduct({ ...product, userRating: 0 });
    await removeRatingFromProduct(productId);
    setRatingChanged(true);
  };

  const { _id, title, price, imageURL, description, liked, userRating, ratingStats } = product;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="product-details">
        <img className="product-details-image" src={imageURL} alt={title} />
        <div className="product-details-body">
          <div className="product-details-header">
            <h2>{title}</h2>
            <span>
              <Like _id={_id} onLike={handleLike} liked={liked} />
            </span>
          </div>
          <div className="product-details-description">
            <div style={{ display: "flex" }}>
              <Rating _id={_id} rating={ratingStats && ratingStats.size > 0 ? Math.round(ratingStats.total / ratingStats.size) : 0} hoverEnabled={false} />
              <span
                style={{ cursor: "pointer", fontSize: "0.9rem", color: "#707070", margin: "1px 0 0 4px" }}
              >
                {ratingStats && ratingStats.size > 0 ? `(${ratingStats.size})` : ""}
              </span>
            </div>
            <h4>Description</h4>
            <p>{description}</p>
          </div>
          <div className="product-details-buy">
            <button className="btn btn-primary"
              onClick={() => alert("Not implemented yet.")}
            > Buy now
            </button>
            <p style={{ margin: "1rem" }}> <strong>Price:</strong> {parseFloat(price).toFixed(2)}€ </p>
          </div>
        </div>
      </div>
      <div className="product-rate">
        <p>Rate this product:</p>
        <Rating _id={_id} rating={userRating}
          onSaveRating={handleSaveRating} onRemoveRating={handleRemoveRating} />
      </div>
      <CommentSection data={comments} user={authService.getCurrentUser()} />
    </div>
  );
}

export default ProductPage;
