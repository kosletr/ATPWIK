import http from "./httpService";
import config from "../config.json";

const userProductsUrl = config.apiUrl + "/users/products";
const userLikesUrl = config.apiUrl + "/users/likes";

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
  if (product._id !== "") {
    delete product._id;
    return http.put(`${userProductsUrl}/${product._id}`, product);
  }
  delete product._id;
  return http.post(userProductsUrl, product);
}

/* Delete Product of the current User */
export function deleteUserProductById(productId) {
  return http.delete(`${userProductsUrl}/${productId}`);
}

/* Get Favourites of the current User */
export function getLikedProductIds() {
  return http.get(userLikesUrl);
}

export function addLikeToProduct(productId) {
  return http.post(`${userLikesUrl}/${productId}`);
}

export function removeLikeFromProduct(productId) {
  return http.delete(`${userLikesUrl}/${productId}`);
}
