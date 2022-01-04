import http from "./httpService";
import config from "../config.json";

const productsUrl = config.apiUrl + "/products/ratings/stats";
const userProductsUrl = config.apiUrl + "/users/products";
const userLikesUrl = config.apiUrl + "/users/likes";
const userRatingsUrl = config.apiUrl + "/users/ratings";

/* All Products of the current User */
export function getUserProducts() {
  return http.get(userProductsUrl);
}

/* Get Product by Id of the current User */
export function getUserProductById(productId) {
  return http.get(`${userProductsUrl}/${productId}`);
}

/* Save Product of the current User */
export function saveUserProduct(product) {
  const productId = product._id;
  if (productId !== "") {
    delete product._id;
    return http.put(`${userProductsUrl}/${productId}`, product);
  }
  delete product._id;
  return http.post(userProductsUrl, product);
}

/* Delete Product of the current User */
export function deleteUserProductById(productId) {
  return http.delete(`${userProductsUrl}/${productId}`);
}

/* Favourites of the current User */
export function getLikedProductIds() {
  return http.get(userLikesUrl);
}

export function getLikeByProductId(productId) {
  return http.get(`${userLikesUrl}/${productId}`);
}

export function addLikeToProduct(productId) {
  return http.post(`${userLikesUrl}/${productId}`);
}

export function removeLikeFromProduct(productId) {
  return http.delete(`${userLikesUrl}/${productId}`);
}

/* Ratings of the current User */
export function getRatedProductIds() {
  return http.get(userRatingsUrl);
}

export function getRatingByProductId(productId) {
  return http.get(`${userRatingsUrl}/${productId}`);
}

export function addRatingToProduct(productId, rating) {
  return http.put(`${userRatingsUrl}/${productId}`, { rating });
}

export function removeRatingFromProduct(productId) {
  return http.delete(`${userRatingsUrl}/${productId}`);
}

export function getTotalRatings() {
  return http.get(productsUrl);
}