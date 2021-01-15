import React from "react";

function SidebarGroup({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) {
  return (
    <React.Fragment>
      <h6>Categories</h6>
      <div className="col">
        <ul className="nav nav-sidebar">
          {items.map((item) => (
            <li
              key={item[valueProperty]}
              value={item === selectedItem ? true : false}
              style={{ cursor: "pointer" }}
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

export default SidebarGroup;
