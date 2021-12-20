import React from "react";
import ProfileProductsTable from "./profileProductsTable";
import ProfileLikesTable from "./profileLikesTable";
import CategoriesTable from "./categoriesTable";
import { Link } from "react-router-dom";

function Profile({ user }) {
  return (
    <React.Fragment>
      {user && (
        <div className="container">
          <h3 style={{ padding: "2rem 0" }}>Hello {user.firstname} {user.lastname}</h3>
          <Link to="/profile/products/new" className="btn btn-primary">
            Add Product
          </Link>
          <h4 style={{ padding: "2rem 0" }}>My Products</h4>
          <ProfileProductsTable ownerId={user._id} />
          <h4 style={{ padding: "2rem 0" }}>My Favourites</h4>
          <ProfileLikesTable />
          {user.isAdmin && (
            <React.Fragment>
              <h4 style={{ padding: "2rem 0" }}>Categories</h4>
              <Link to="/profile/categories/new" className="btn btn-primary">
                Add Category
              </Link>
              <div style={{ paddingTop: "2rem" }}>
                <CategoriesTable />
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Profile;
