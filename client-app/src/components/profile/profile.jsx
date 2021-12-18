import React from "react";
import ProfileProductsTable from "./profileProductsTable";
import ProfileLikesTable from "./profileLikesTable";
import { Link } from "react-router-dom";

function Profile({ user }) {
  return (
    <React.Fragment>
      {user && (
        <React.Fragment>
          <div className="">
            <div>
              <h3>
                Hello {user.firstname} {user.lastname}
              </h3>
            </div>
            <div>
              <div className="" />
              <div className="">
                <Link to="/profile/products/new" className="btn btn-primary">
                  Add Product
                </Link>
              </div>
            </div>
            <div
            
              style={{ paddingTop: "2em", paddingBottom: "1em" }}
            >
              <h4>My Products</h4>
            </div>
            <div>
              <ProfileProductsTable ownerId={user._id} />
            </div>
            <div
            
              style={{ paddingTop: "2em", paddingBottom: "1em" }}
            >
              <h4>My Favourites</h4>
            </div>
            <div>
              <ProfileLikesTable />
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Profile;
