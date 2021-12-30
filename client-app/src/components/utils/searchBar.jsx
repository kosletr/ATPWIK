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
          height: "60px", width: "454px", padding: "0 20px",
          borderRadius: "30px", marginBottom: "1rem",
          fontSize: "20px", fontFamily: "Arial, FontAwesome"
        }} />
      <datalist id="datalist">
        {items.map((i) => (
          <option key={i.id} value={i.title}></option>
        ))}
      </datalist>
    </div>
  );
}

export default SearchBar;
