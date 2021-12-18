import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <React.Fragment className="navbar-nav">
      <Link className="nav-item nav-link" style={{ fontSize: "1.5rem" }} to="/">Atswik</Link>
      <NavLink className="nav-item nav-link" to="/">Home</NavLink>
      <NavLink className="nav-item nav-link" to="/products">Products</NavLink>
      {!user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/profile">{user.username}</NavLink>
          <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
