import React from "react";
import Form from "../utils/form";
import Joi from "joi-browser";
import authService from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;

      await authService.login({ username, password });

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ paddingBottom: "2em" }}>
          <div className="" />
          <div className="">
            <h3 align="center">Login Page</h3>
          </div>
          <div className="" />
        </div>
        <div>
          <div className="" />
          <div className="">
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
          <div className="" />
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
