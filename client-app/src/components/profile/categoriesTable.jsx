import React, { useEffect, useState } from "react";
import _ from "lodash";
import Table from "../utils/table";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { getCategories, removeCategory } from "../../services/categoryService";
import authService from "../../services/authService";

function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  useEffect(async () => {
    const { data: receivedCategories } = await getCategories();
    setCategories(receivedCategories);
  }, [])


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (category) => {
    const originalCategories = { ...categories };
    setCategories(categories.filter(c => c._id !== category._id));

    try {
      await removeCategory(category._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.error("This category has already been removed.");
      setCategories(originalCategories);
    }
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const columns = [
    {
      path: "name",
      label: "Name",
      content: category => category.name,
    }
  ];

  const deleteColumn = {
    key: "delete",
    content: (category) => (
      <button
        onClick={() => handleDelete(category)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  const user = authService.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  const allCategories = categories;

  const totalCount = allCategories.length;
  if (allCategories.length === 0) return <p>No categories.</p>;

  const sortedCategories = _.orderBy(
    allCategories,
    [sortColumn.path],
    [sortColumn.order]
  );

  const pageCategories = paginate(sortedCategories, currentPage, pageSize);

  return (
    <React.Fragment>
      <Table
        columns={columns}
        data={pageCategories}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
      {(totalCount > pageSize) && <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />}
    </React.Fragment>
  );
}

export default CategoriesTable;
