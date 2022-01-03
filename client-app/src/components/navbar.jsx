import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="my-navbar">
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        <i className="fa fa-bars" />
      </button>
      <div className={"nav-body " + (collapsed ? "my-collapse" : "")}>
        <div className="nav-group">
          <div>
            <NavLink className="my-nav-brand" exact to="/">
              Atpwik
            </NavLink>
          </div>
          <div>
            <NavLink
              className={isActive =>
                "my-nav-item" + (isActive ? "" : " my-nav-item-active")
              } exact to="/">
              Home
            </NavLink>
            <NavLink
              className={isActive =>
                "my-nav-item" + (isActive ? "" : " my-nav-item-active")
              } exact to="/products">
              Products
            </NavLink>
          </div>
        </div>
        <div className="nav-group">
          {!user && (
            <>
              <NavLink
                className={isActive =>
                  "my-nav-item" + (isActive ? "" : " my-nav-item-active")
                } exact to="/login">
                Login
              </NavLink>
              <NavLink
                className={isActive =>
                  "my-nav-item" + (isActive ? "" : " my-nav-item-active")
                } exact to="/register">
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink
                className={isActive =>
                  "my-nav-item" + (isActive ? "" : " my-nav-item-active")
                } exact to="/profile">
                {user.username}
              </NavLink>
              <NavLink
                className={isActive =>
                  "my-nav-item" + (isActive ? "" : " my-nav-item-active")
                } exact to="/logout">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
