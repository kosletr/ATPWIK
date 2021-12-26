import http from "./httpService";
import config from "../config.json";

const categoryBaseUrl = `${config.apiUrl}/categories`

function getCategories() {
  return http.get(categoryBaseUrl);
}

function getCategoryById(_id) {
  return http.get(`${categoryBaseUrl}/${_id}`);
}

function saveCategory(category) {
  return category._id === ""
    ? http.post(categoryBaseUrl, { name: category.name })
    : http.put(`${categoryBaseUrl}/${category._id}`, category);
}

function removeCategory(_id) {
  return http.delete(`${categoryBaseUrl}/${_id}`)
}

export { getCategories, getCategoryById, saveCategory, removeCategory };