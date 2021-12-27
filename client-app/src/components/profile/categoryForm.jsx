import React from "react";
import Form from "../utils/form/form";
import Joi from "joi-browser";
import { getCategories, getCategoryById, saveCategory } from "../../services/categoryService";

class CategoryPage extends Form {
  state = {
    data: { _id: "", name: "" },
    errors: {},
  };

  schema = {
    _id: Joi.string().length(24).allow(""),
    name: Joi.string().min(1).max(20).required().label("Category"),
  };

  async populateCategories() {
    const categories = await getCategories();
    this.setState(categories);
  }

  async populateCategory() {
    try {
      const categoryId = this.props.match.params.id;
      if (categoryId === "new") return;
      const { data: category } = await getCategoryById(categoryId);
      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      console.error(ex);
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    // await this.populateCategories();
    await this.populateCategory();
  }

  mapToViewModel(category) {
    return { _id: category._id, name: category.name };
  }

  doSubmit = async () => {
    try {
      await saveCategory(this.state.data);
      this.props.history.push("/profile/products");
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  render() {
    return (
      <div className="my-form-layout" >
        <div className="my-form-title">
          <h1>New Category Form</h1>
        </div>
        <div className="my-form-body">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Category", "Enter a new category...")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default CategoryPage;
