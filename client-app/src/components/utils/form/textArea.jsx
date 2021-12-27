import React from "react";

function TextArea({ name, label, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="form-control"
        rows="10"
        cols="30"
        style={{ resize: "none" }}
        {...rest}
        name={name}
        id={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
