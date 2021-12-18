import React, { Component } from "react";
import "../../layout.css"
import Sidebar from "../utils/sidebar";
import Card from "../utils/card";
import ListCards from "../utils/listCards";
import SearchBox2 from "../utils/searchBox";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import authService from "../../services/authService";
import {
  getLikedProductIds,
  addLikeToProduct,
  removeLikeFromProduct,
  getRatedProductIds,
  addRatingToProduct,
  removeRatingFromProduct,
} from "../../services/userService";

export class Products extends Component {
  state = {
    products: [],
    categories: [],
    currentPage: 1,
    pageSize: 12,
    searchQuery: "",
    selectedCategory: null,
  };

  async componentDidMount() {
    let { data: categories } = await getCategories();
    categories = [{ _id: "", name: "All Categories" }, ...categories];

    const { data: products } = await getProducts();

    if (authService.getCurrentUser() != null) {
      // Get User's Likes
      const { data: likedProductIds } = await getLikedProductIds();

      products.forEach((p) => {
        p.liked = likedProductIds.includes(p._id);
      });

      // Get User's Ratings
      const { data: ratings } = await getRatedProductIds();

      ratings.forEach((r) => {
        let p_index = products.findIndex((p) => p._id === r.productId);
        if (p_index >= 0) products[p_index].rating = r.rating;
      });
    }

    this.setState({ products, categories });
  }

  handleLike = async ({ currentTarget: input }) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }
    const products = [...this.state.products];
    const productId = input.id;
    const index = products.findIndex((p) => p._id === productId);
    products[index] = { ...products[index] };
    products[index].liked = !products[index].liked;
    this.setState({ products });

    if (products[index].liked) await addLikeToProduct(productId);
    else await removeLikeFromProduct(productId);
  };

  /* Rating Component */

  handleSaveRating = async (rating, productId) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }
    const products = [...this.state.products];
    const index = products.findIndex((p) => p._id === productId);
    products[index] = { ...products[index] };

    products[index].rating = rating;
    this.setState({ products });

    await addRatingToProduct(productId, rating);
  };

  handleRemoveRating = async (productId) => {
    if (authService.getCurrentUser() == null) {
      this.props.history.push("/login");
      return;
    }
    const products = [...this.state.products];
    const index = products.findIndex((p) => p._id === productId);
    products[index] = { ...products[index] };

    products[index].rating = 0;
    this.setState({ products });

    await removeRatingFromProduct(productId);
  };

  /* Pagination Component */

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = (category) => {
    this.setState({
      selectedCategory: category,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedCategory,
      searchQuery,
      products: allProducts,
    } = this.state;

    let searchList = [];
    let filtered = allProducts;
    if (selectedCategory && selectedCategory._id)
      filtered = allProducts.filter(
        (m) => m.category._id === selectedCategory._id
      );

    if (searchQuery) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      searchList = filtered.slice(0, 5);
    }

    const products = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: products, searchList };
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are no products in the database.</p>;

    const { totalCount, data: products, searchList } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="sidebar">
          <Sidebar
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="main">
          <SearchBox2
            value={searchQuery}
            onChange={this.handleSearch}
            items={searchList}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <ListCards
            data={products}
            Component={Card}
            cardDetails={["_id", "title", "price", "shortDesc", "imageURL", "liked", "rating", "owner"]}
            extraProps={{
              onLike: this.handleLike,
              onSaveRating: this.handleSaveRating,
              onRemoveRating: this.handleRemoveRating,
            }}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
