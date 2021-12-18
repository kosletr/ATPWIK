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
      <h6 style={{ margin: "0.5rem 0" }} >Categories</h6>
      <div>
        <ul>
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

export default SidebarGroup;
