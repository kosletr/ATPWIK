import React, { Component } from "react";
import ListCards from "./utils/listCards";
import { getProducts } from "../services/fakeProductService";
import Sidebar from "./sidebar";
import Card from "./utils/card";
import Pagination from "./utils/pagination";
import { paginate } from "./utils/paginate";
import SearchBox from "./utils/searchBox";

export class Products extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 12,
    searchQuery: "",
  };

  componentDidMount() {
    const products = getProducts();
    this.setState({ products });
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

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      products: allProducts,
    } = this.state;

    let filtered = allProducts;
    if (searchQuery)
      filtered = allProducts.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const products = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: products };
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, searchQuery } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="col-3">
          <Sidebar />
        </div>

        <div className="col main">
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm">
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
            </div>
            <div className="col-sm-3" />
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
