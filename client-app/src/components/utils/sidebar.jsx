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
    <React.Fragment>
      <h5 style={{ margin: "1rem 0" }}>Filters</h5>
      <SidebarGroup
        items={items}
        textProperty={textProperty}
        valueProperty={valueProperty}
        selectedItem={selectedItem}
        onItemSelect={onItemSelect}
      />
      {/* <h6>Others</h6>
      <ul>
        <li style={{ margin: "0.5rem 0" }}><Link to="/">To do</Link></li>
        <li style={{ margin: "0.5rem 0" }}><Link to="/">To do</Link></li>
        <li style={{ margin: "0.5rem 0" }}><Link to="/">To do</Link></li>
        <li style={{ margin: "0.5rem 0" }}><Link to="/">To do</Link></li>
        <li style={{ margin: "0.5rem 0" }}><Link to="/">To do</Link></li>
      </ul> */}
    </React.Fragment>
  );
};

Sidebar.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Sidebar;
