import React from "react";

function SearchBar({ value, onChange, items }) {
  return (
    <React.Fragment>
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="&#xF002; Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        list="datalist"
        style={{ height: "3rem", width: "800px", fontFamily: "Arial, FontAwesome" }}
      />
      <datalist id="datalist">
        {items.map((i) => (
          <option key={i.id} value={i.title}></option>
        ))}
      </datalist>
    </React.Fragment>
  );
}

export default SearchBar;
