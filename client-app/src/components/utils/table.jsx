import React from "react";
import _ from "lodash";

function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table" style={{
      width: "75rem",
      borderRadius: "10px",
      overflow: "hidden",
      borderStyle: "hidden",
      boxShadow: "0 0 0 1px lightgray"
    }}>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};


function TableBody({ data, columns }) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

// columns: array
// sortColumn: object
// onSort: function

function TableHeader({ sortColumn, onSort, columns }) {
  const raiseSort = (path) => {
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (!column.label) return;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead style={{ backgroundColor: "#f1f1f1" }}>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => column.label ? raiseSort(column.path) : null}
            style={{ cursor: "pointer" }}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}


export default Table;
