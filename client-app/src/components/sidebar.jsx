import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="nav nav-sidebar">
        <li>
          <a href="#">Categories</a>
        </li>
        <li>
          <a href="#">Reports</a>
        </li>
        <li>
          <a href="#">Analytics</a>
        </li>
        <li>
          <a href="#">Export</a>
        </li>
      </ul>
      <ul className="nav nav-sidebar">
        <li>
          <a href="">Nav item</a>
        </li>
        <li>
          <a href="">Nav item again</a>
        </li>
        <li>
          <a href="">One more nav</a>
        </li>
        <li>
          <a href="">Another nav item</a>
        </li>
        <li>
          <a href="">More navigation</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
