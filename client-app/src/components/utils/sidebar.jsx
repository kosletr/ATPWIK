import React from "react";
import { Link } from "react-router-dom";

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

function SidebarGroup({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) {
  return (
    <React.Fragment>
      <h6 style={{ margin: "0.5rem 0" }} >Categories</h6>
      <div>
        <ul style={{ listStyleType: "none" }}>
          {items.map((item) => (
            <li
              key={item[valueProperty]}
              value={item === selectedItem ? true : false}
              style={{ cursor: "pointer", margin: "0.5rem 0" }}
              onClick={() => onItemSelect(item)}
            >
              <input
                type="radio"
                onChange={() => onItemSelect(item)}
                checked={item === selectedItem ? true : false}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
              {item[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
