import React from "react";
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
            <a href="">Nav</a>
          </li>
          <li>
            <a href="">Nav item</a>
          </li>
          <li>
            <a href="">One more nav</a>
          </li>
          <li>
            <a href="">Another nav item</a>
          </li>
          <li>
            <a href="">More navigation</a>
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
