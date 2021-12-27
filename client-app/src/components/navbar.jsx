import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="my-navbar">
      <NavLink className="my-nav-brand" to="/">
        Atswik
      </NavLink>
      <NavLink className="my-nav-item" to="/">
        Home
      </NavLink>
      <NavLink className="my-nav-item" to="/products">
        Products
      </NavLink>
      {!user && (
        <React.Fragment>
          <NavLink className="my-nav-item" to="/login">
            Login
          </NavLink>
          <NavLink className="my-nav-item" to="/register">
            Register
          </NavLink>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <NavLink className="my-nav-item" to="/profile">
            {user.username}
          </NavLink>
          <NavLink className="my-nav-item" to="/logout">
            Logout
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
}
