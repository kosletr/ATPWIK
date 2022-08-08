import React from 'react';

import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/auth/loginForm";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/product/products";
import HomePage from "./components/homePage";
import RegisterForm from "./components/auth/registerForm";
import ProfileProductPage from "./components/profile/profileProductForm";
import CategoryPage from "./components/profile/categoryForm";
import authService from "./services/authService";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.css";

import { useState, useEffect } from "react";
import Logout from "./components/auth/logout";
import Profile from "./components/profile/profile";
import ProductPage from "./components/product/productDetailsPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) setUser(user);
  }, []);

  return (
    <div className="my-layout">
      <Navbar user={user} />
        <ToastContainer />
      <div className="my-main">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/profile/products/:id" component={ProfileProductPage} />
          <Route path="/profile/categories/:id" component={CategoryPage} />
          <Route path="/profile" render={() => <Profile user={user} />} />
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/products" component={Products} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
