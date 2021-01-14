import React from "react";
import Form from "./utils/form";
import Joi from "joi-browser";
import authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    await authService.login({ username, password });
    window.location = "/";
  };
  render() {
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
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username", "Enter Username")}
              {this.renderInput(
                "password",
                "Password",
                "Enter Password",
                "password"
              )}
              {this.renderButton("Login")}
            </form>
          </div>
          <div className="col" />
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
