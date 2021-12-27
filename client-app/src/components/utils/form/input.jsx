import React from "react";

function Input({ name, label, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor="exampleInputPassword1">{label}</label>
      <input className="form-control" {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
