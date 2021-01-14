import React from "react";

function Profile({ user }) {
  return (
    <React.Fragment>
      {user && (
        <h3>
          Hello {user.firstname} {user.lastname}
        </h3>
      )}
    </React.Fragment>
  );
}

export default Profile;
