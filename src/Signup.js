import React, { Component } from "react";
import "./css/Signup.css";
import { Link, Navigate } from "react-router-dom";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
} from "./constants.js";
import { signup } from "./APIUtils.js";
import fbLogo from "./images/fb-logo.png";
import googleLogo from "./images/google-logo.png";
import githubLogo from "./images/github-logo.png";
import { toast } from "react-toastify";

function Signup(props) {

    if (props.authenticated) {
      return (
        <Navigate
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
          replace
        />
      );
    }

    return (
      <div className="signup-container">
        <div className="signup-content">
          <h1 className="signup-title">Signup with SpringSocial</h1>
          <SocialSignup />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <SignupForm {...props} />
          <span className="login-link">
            Already have an account? <Link to="/login">Login!</Link>
          </span>
        </div>
      </div>
    );

}

class SocialSignup extends Component {
  render() {
    return (
      <div className="social-signup">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Sign up with Google
        </a>
        <a
          className="btn btn-block social-btn facebook"
          href={FACEBOOK_AUTH_URL}
        >
          <img src={fbLogo} alt="Facebook" /> Sign up with Facebook
        </a>
        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt="Github" /> Sign up with Github
        </a>
      </div>
    );
  }
}

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signUpRequest = Object.assign({}, this.state);

    signup(signUpRequest)
      .then((response) => {
        toast.success(
          "You're successfully registered. Please login to continue!"
        );
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

export default Signup;
