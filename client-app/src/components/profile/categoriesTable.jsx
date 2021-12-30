import React, { Component } from "react";
import _ from "lodash";
import Table from "../utils/table";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { getCategories, removeCategory } from "../../services/categoryService";
import authService from "../../services/authService";

class CategoriesTable extends Component {
  state = {
    categories: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }


  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (category) => {
    const originalCategories = { ...this.state.categories };
    const categories = originalCategories.filter(c => c._id !== category._id);
    this.setState({ categories })

    try {
      await removeCategory(category._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.error("This category has already been removed.");
      this.setState({ categories: originalCategories });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  columns = [
    { path: "name", label: "Name", content: category => category.name },
    { path: "empty", label: "" }
  ];

  deleteColumn = {
    key: "delete",
    align: "center",
    content: (category) => (
      <button
        onClick={() => this.handleDelete(category)}
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
      categories: allCategories,
      sortColumn,
      pageSize,
      currentPage,
    } = this.state;


    const totalCount = allCategories.length;
    if (totalCount === 0) return <p>No categories.</p>;

    const sortedCategories = _.orderBy(
      allCategories,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pageCategories = paginate(sortedCategories, this.state.currentPage, this.state.pageSize);

    return (
      <>
        <Table
          columns={this.columns}
          data={pageCategories}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        {(totalCount > this.pageSize) && <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />}
      </>
    );
  }
}
export default CategoriesTable;
