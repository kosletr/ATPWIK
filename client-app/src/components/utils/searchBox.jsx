import React from "react";

function SearchBox2({ value, onChange, items }) {
  return (
    <React.Fragment>
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="&#xF002; Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        list="datalist"
        style={{ width: "455px", fontFamily: "Arial, FontAwesome" }}
      />
      <datalist id="datalist">
        {items.map((i) => (
          <option key={i.id} value={i.title}></option>
        ))}
      </datalist>
    </React.Fragment>
  );
}

export default SearchBox2;
