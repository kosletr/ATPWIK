import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <React.Fragment>
      <Link style={{ fontSize: "1.5rem" }} to="/">Atswik</Link>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      {!user && (
        <React.Fragment>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <NavLink to="/profile">{user.username}</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
