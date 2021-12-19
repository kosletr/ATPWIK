import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route {...rest} render={props => auth.getCurrentUser()
      ? (Component ? <Component {...props} /> : render(props))
      : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    } />
  );
};

export default ProtectedRoute;
