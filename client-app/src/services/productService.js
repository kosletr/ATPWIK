import http from "./httpService";
import config from "../config.json";

const productsUrl = `${config.apiUrl}/products`;

/* All Products */
export function getProducts() {
  return http.get(productsUrl);
}
