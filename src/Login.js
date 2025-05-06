import React, { Component, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./css/Login.css";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "./constants";
import { login } from "./APIUtils";
import { Link, Navigate } from "react-router-dom";
import fbLogo from "./images/fb-logo.png";
import googleLogo from "./images/google-logo.png";
import githubLogo from "./images/github-logo.png";
import { toast, ToastContainer } from "react-toastify";

function Login(props) {

    useEffect(() => {
      if(location.state && location.state.error) {
        setTimeout(() => {
          toast.error(location.state.error);
        }, 100);
      }
    },[]);

    const location = useLocation();

    if (props.authenticated) {
      return (
        <Navigate
          to={{
            pathname: "/profile",
            state: { from: props.location },
          }}
          replace
        />
      );
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to SpringSocial</h1>
          <SocialLogin />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <LoginForm {...props} />
          <span className="signup-link">
            New user? <Link to="/signup">Sign up!</Link>
          </span>
        </div>
      </div>
    );

}

function SocialLogin() {

    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
        {/* <a
          className="btn btn-block social-btn facebook"
          href={FACEBOOK_AUTH_URL}
        >
          <img src={fbLogo} alt="Facebook" /> Log in with Facebook
        </a>
        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt="Github" /> Log in with Github
        </a> */}
      </div>
    );

}

function LoginForm(props) {

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    setState({...state, [inputName]: inputValue});
    
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const loginRequest = Object.assign({}, state);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        props.loadUser();
        toast.success("You're successfully logged in!", {
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!",
          {
            theme: "colored",
          }
        );
      });
  }

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={state.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={state.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Login
          </button>
        </div>
      </form>
    );
}

export default Login;
