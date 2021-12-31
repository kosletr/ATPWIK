import React from "react";

function SearchBar({ value, onChange, items }) {
  return (
    <div className="my-container">
      <input
        type="text"
        name="query"
        className="form-control"
        placeholder="&#xF002; Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        list="datalist"
        style={{
          height: "50px", width: "454px",
          padding: "0 20px", borderRadius: "30px",
          fontSize: "1.2rem", fontFamily: "Arial, FontAwesome"
        }} />
      <datalist id="datalist">
        {items.map((item) => (
          <option key={item._id} value={item.title}></option>
        ))}
      </datalist>
    </div>
  );
}

export default SearchBar;
