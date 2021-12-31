import React from "react";
import ProfileProductsTable from "./profileProductsTable";
import ProfileLikesTable from "./profileLikesTable";
import CategoriesTable from "./categoriesTable";
import { Link, useHistory } from "react-router-dom";

function Profile({ user }) {
  const history = useHistory();

  if (!user) {
    history.push("/login");
    return null;
  }

  return (
    <div>
      <div className="profile-section">
        <h3>Hello {user.firstname} {user.lastname}</h3>
      </div>
      <div className="profile-section">
        <Link to="/profile/products/new" className="btn btn-primary">
          Add Product
        </Link>
        <h4>My Products</h4>
        <ProfileProductsTable ownerId={user._id} />
      </div>
      <div className="profile-section">
        <h4>My Favourites</h4>
        <ProfileLikesTable />
      </div>
      {user.isAdmin && (
        <div className="profile-section">
          <h4>Categories</h4>
          <Link to="/profile/categories/new" className="btn btn-primary">
            Add Category
          </Link>
          <CategoriesTable />
        </div>
      )}
    </div>
  );
}

export default Profile;
