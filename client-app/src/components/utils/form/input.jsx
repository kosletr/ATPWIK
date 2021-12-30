import React from "react";

function Input({ name, label, error, ...rest }) {
  return (
    <div className="form-group" style={{ marginRight: "10rem"}}>
      <label htmlFor="exampleInputPassword1">{label}</label>
      <input className="form-control" {...rest} name={name} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
