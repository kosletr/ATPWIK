import React, { Component } from "react";
import _ from "lodash";
import Table from "../utils/table";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import {
  getLikedProductIds,
  removeLikeFromProduct,
} from "../../services/userService";
import authService from "../../services/authService";

class ProductsTable extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data: likedProductIds } = await getLikedProductIds();

    const filtered = products.filter(function (p) {
      return this.indexOf(p._id) >= 0;
    }, likedProductIds);

    this.setState({ products: filtered });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (product) => {
    const originalProducts = this.state.products;
    const products = originalProducts.filter((p) => p._id !== product._id);
    this.setState({ products });

    try {
      await removeLikeFromProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.error("This product has already been removed.");

      this.setState({ products: originalProducts });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  columns = [
    {
      path: "title",
      label: "Title",
      content: (product) => (
        <Link to={`/products/${product._id}`}>{product.title}</Link>
      ),
    },
    { path: "category.name", label: "Category" },
  ];

  deleteColumn = {
    key: "delete",
    content: (product) => (
      <button
        onClick={() => this.handleDelete(product)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user) this.columns.push(this.deleteColumn);
  }

  render() {
    const {
      products: allProducts,
      sortColumn,
      pageSize,
      currentPage,
    } = this.state;

    const totalCount = allProducts.length;
    if (allProducts.length === 0) return <p>No products.</p>;

    const sortedProducts = _.orderBy(
      allProducts,
      [sortColumn.path],
      [sortColumn.order]
    );


    const products = paginate(sortedProducts, currentPage, pageSize);

    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          data={products}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default ProductsTable;
