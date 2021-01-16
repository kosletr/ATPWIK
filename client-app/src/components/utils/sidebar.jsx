import React from "react";
import { Link } from "react-router-dom";
import SidebarGroup from "./sidebarGroup";

const Sidebar = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <div className="sidebar">
      <h5 style={{ marginBottom: "2em" }}>Filters</h5>
      <SidebarGroup
        items={items}
        textProperty={textProperty}
        valueProperty={valueProperty}
        selectedItem={selectedItem}
        onItemSelect={onItemSelect}
      />

      <h6>Others</h6>
      <div className="col">
        <ul className="nav nav-sidebar">
          <li>
            <Link to="/">To do</Link>
          </li>
          <li>
            <Link to="/">To do</Link>
          </li>
          <li>
            <Link to="/">To do</Link>
          </li>
          <li>
            <Link to="/">To do</Link>
          </li>
          <li>
            <Link to="/">To do</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Sidebar;
