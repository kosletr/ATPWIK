import React, { Component } from "react";
import Sidebar from "./sidebar";
import Card from "./utils/card";
import ListCards from "./utils/listCards";
import SearchBox2 from "./utils/searchBox";
import Pagination from "./utils/pagination";
import { paginate } from "./utils/paginate";
import { getProducts } from "../services/fakeProductService";
import { getCategories } from "../services/fakeCategoryService";

export class Products extends Component {
  state = {
    products: [],
    categories: [],
    currentPage: 1,
    pageSize: 12,
    searchQuery: "",
    selectedCategory: null,
  };

  componentDidMount() {
    let categories = getCategories();
    categories = [{ _id: "", name: "All Categories" }, ...categories];

    const products = getProducts();
    this.setState({ products, categories });
  }

  handleLike = ({ currentTarget: input }) => {
    let products = [...this.state.products];
    const index = products.findIndex((p) => p.id === input.id);
    products[index] = { ...products[index] };
    products[index].liked = !products[index].liked;
    this.setState({ products });
  };

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

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: products, searchList } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="col-3">
          <Sidebar
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>

        <div className="col main">
          <div className="row">
            <div className="col-sm-5" />
            <div className="col-sm">
              <SearchBox2
                value={searchQuery}
                onChange={this.handleSearch}
                items={searchList}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-9" />
            <div className="col">
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-2" />
            <div className="col-" />
            <div className="col">
              <ListCards
                data={products}
                Component={Card}
                cardDetails={["id", "title", "shortDesc", "imageURL", "liked"]}
                extraProps={{ onLike: this.handleLike }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-9" />
            <div className="col">
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Products;
