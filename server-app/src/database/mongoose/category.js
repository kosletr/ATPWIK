const mongoose = require("mongoose");

const Category = mongoose.model(
  "category",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
  })
);

function getAllCategories() {
  return Category.find().select("-__v");
}

function getCategoryById(categoryId) {
  return Category.find({ _id: categoryId }).select("-__v");
}

function getCategoryByName(name) {
  return Category.findOne({ name }).select("-__v");
}

function createCategory(categoryInfo) {
  return new Category(categoryInfo).save()._id;
}

function updateCategoryName(categoryId, newCategoryName) {
  return Category.findOneAndUpdate({ _id: categoryId }, { name: newCategoryName });
}

function deleteCategory(categoryId) {
  return Category.findOneAndDelete({ _id: categoryId });
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategoryName,
  deleteCategory
};
