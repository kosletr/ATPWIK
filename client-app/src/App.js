import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/products";
import HomePage from "./components/homePage";
import RegisterForm from "./components/registerForm";
import authService from "./services/authService";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";

import React, { Component } from "react";
import Logout from "./components/logout";
import Profile from "./components/profile";

export class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    user && this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Navbar user={user} />
        <main className="container-fluid">
          <ToastContainer />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/profile" render={() => <Profile user={user} />} />
            <Route path="/products" component={Products} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
