import http from "./httpService";
import { apiUrl } from "../config.json";

const categoryBaseUrl = `${apiUrl}/categories`

function getCategories() {
  return http.get(categoryBaseUrl);
}

function getCategoryById(_id) {
  return http.get(`${categoryBaseUrl}/${_id}`);
}

function saveCategory(category) {
  const categoryId = category._id;
  delete category._id;
  return categoryId === ""
    ? http.post(categoryBaseUrl, category)
    : http.put(`${categoryBaseUrl}/${categoryId}`, category);
}

export { getCategories, getCategoryById, saveCategory };