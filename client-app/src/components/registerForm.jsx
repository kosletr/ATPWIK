import React from "react";
import Form from "./utils/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    errors: {},
  };

  schema = {
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("E-mail"),
    password: Joi.string().min(6).required().label("Password"),
    repeatPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
      .label("Confirm password"),
  };

  doSubmit = () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ paddingBottom: "2em" }}>
          <div className="col" />
          <div className="col">
            <h3 align="center">Register Page</h3>
          </div>
          <div className="col" />
        </div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("firstname", "Firstname", "Enter Firstname")}
              {this.renderInput("lastname", "Lastname", "Enter Lastname")}
              {this.renderInput("username", "Username", "Enter Username")}
              {this.renderInput(
                "password",
                "Password",
                "Enter Password",
                "password"
              )}
              {this.renderInput(
                "repeatPassword",
                "Confirm Password",
                "Re-enter Password",
                "password"
              )}
              {this.renderInput("email", "E-mail", "Enter E-mail", "email")}
              {this.renderButton("Register")}
            </form>
          </div>
          <div className="col" />
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
