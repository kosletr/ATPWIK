import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="my-navbar">
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <i className="fa fa-bars"/>
      </button>
      <div className={"nav-group " + (collapsed ? "my-collapse" : "")}>
        <NavLink className="my-nav-brand" to="/">
          Atswik
        </NavLink>
        <NavLink className="my-nav-item" to="/">
          Home
        </NavLink>
        <NavLink className="my-nav-item" to="/products">
          Products
        </NavLink>
      </div>
      <div className={"nav-group " + (collapsed ? "my-collapse" : "")}>
        {!user && (
          <>
            <NavLink className="my-nav-item" to="/login">
              Login
            </NavLink>
            <NavLink className="my-nav-item" to="/register">
              Register
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink className="my-nav-item" to="/profile">
              {user.username}
            </NavLink>
            <NavLink className="my-nav-item" to="/logout">
              Logout
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
