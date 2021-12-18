import React from "react";
import Form from "../utils/form";
import Joi from "joi-browser";
import authService from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    firstname: Joi.string().min(2).max(30).required().label("Firstname"),
    lastname: Joi.string().min(2).max(30).required().label("Lastname"),
    username: Joi.string().min(2).max(30).required().label("Username"),
    email: Joi.string().email().required().label("E-mail"),
    password: Joi.string().min(6).max(30).required().label("Password"),
    confirmPassword: Joi.string()
      .min(6)
      .max(30)
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
      .label("Confirm password"),
  };

  doSubmit = async () => {
    try {
      const {
        firstname,
        lastname,
        username,
        password,
        email,
      } = this.state.data;

      const response = await authService.register({
        firstname,
        lastname,
        username,
        password,
        email,
      });

      authService.setJWT(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors["username"] = ex.response.data;
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
            <h3 align="center">Register Page</h3>
          </div>
          <div className="" />
        </div>
        <div>
          <div className="" />
          <div className="">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("firstname", "Firstname", "Enter Firstname")}
              {this.renderInput("lastname", "Lastname", "Enter Lastname")}
              {this.renderInput("username", "Username", "Enter Username")}
              {this.renderInput("email", "E-mail", "Enter E-mail", "email")}
              {this.renderInput(
                "password",
                "Password",
                "Enter Password",
                "password"
              )}
              {this.renderInput(
                "confirmPassword",
                "Confirm Password",
                "Re-enter Password",
                "password"
              )}
              {this.renderButton("Register")}
            </form>
          </div>
          <div className="" />
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
