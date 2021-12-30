import React from "react";
import Form from "../utils/form/form";
import Joi from "joi-browser";
import {
  getUserProductById,
  saveUserProduct,
} from "../../services/userService";
import { getCategories } from "../../services/categoryService";

class ProfileProductPage extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      category: "",
      price: "",
      shortDesc: "",
      imageURL: "",
      description: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string().length(24).allow(""),
    title: Joi.string().min(1).max(20).required().label("Title"),
    category: Joi.string().length(24).required().label("Category"),
    price: Joi.number().min(0).precision(2).required().label("Price"),
    shortDesc: Joi.string()
      .min(20)
      .max(100)
      .required()
      .label("Short Description"),
    description: Joi.string()
      .min(20)
      .max(1000)
      .required()
      .label("Full Description"),
    imageURL: Joi.string()
      .min(10)
      .max(1000)
      .required()
      .uri()
      .label("Image URL"),
  };

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populateProduct() {
    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;
      const { data: product } = await getUserProductById(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      console.error(ex);
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCategories();
    await this.populateProduct();
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      title: product.title,
      category: product.category?._id,
      price: product.price,
      shortDesc: product.shortDesc,
      description: product.description,
      imageURL: product.imageURL,
    };
  }

  doSubmit = async () => {
    await saveUserProduct(this.state.data);

    this.props.history.push("/profile/products");
  };

  render() {
    return (
      <div className="my-form-layout" >
        <h1 className="my-container">Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "Short Title")}
          {this.renderSelect("category", "Category", this.state.categories)}
          {this.renderInput("price", "Price", "Price in Euros", "number")}
          {this.renderInput("shortDesc", "Short Description", "Short Description")}
          {this.renderTextArea("description", "Full Description")}
          {this.renderInput("imageURL", "Image URL", "http(s)://example.com/image.jpg")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProfileProductPage;
