import React, { Component } from "react";
import Axios from "axios";
import config from "../config.json";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    status: "",
  };

  handleClick = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      localStorage.removeItem("Authorization");
      const { data } = await Axios.post(`${config.apiEndpoint}/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      });
      localStorage.setItem("Authorization", `Bearer ${data.token}`);
      this.setState({ status: "logedin" });
    } catch (error) {
      console.error(error);
      this.setState({ status: "failed" });
    }
  };

  handleInput = (input) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({ [input]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <div className="row" style={{ paddingBottom: "2em" }}>
          <div className="col" />
          <div className="col">
            <h3 align="center">Login Page</h3>
          </div>
          <div className="col" />
        </div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.handleInput("username")}
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleInput("password")}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "1em" }}
                onClick={this.handleClick}
              >
                Login
              </button>
              <div
                className={
                  this.state.status === "failed"
                    ? "alert alert-danger"
                    : this.state.status === "logedin"
                    ? "alert alert-success"
                    : ""
                }
                role="alert"
              >
                {this.state.status === "failed"
                  ? "Login Failed"
                  : this.state.status === "logedin"
                  ? "Login Succeeded"
                  : ""}
              </div>
            </form>
          </div>
          <div className="col" />
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
