import React, { Component, useEffect, useState, useCallback } from "react";
import "./css/Login.css";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN,
} from "./constants";
import { login } from "./APIUtils";
import { Link, Redirect } from "react-router-dom";
import fbLogo from "./images/fb-logo.png";
import googleLogo from "./images/google-logo.png";
import githubLogo from "./images/github-logo.png";
import { toast } from "react-toastify";

function Login(props) {
  {/*componentDidMount() {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
  if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        toast.error(this.props.location.state.error);
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {},
        });
      }, 100);
    }
  }*/}

    useEffect(() => {
      if(props.location.state && props.location.state.error) {
        setTimeout(() => {
          toast.error(props.location.state.error);
          props.history.replace({
            pathname: props.location.pathname,
            state: {},
          });
        }, 100);
      }
    },[]);

    if (props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
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

{/*constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }*/}

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    console.log("ENTERING handleInputChange");
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    console.log(target);
    console.log(inputName);
    console.log(inputValue);

    setState({...state, [inputName]: inputValue});
    
    console.log(state);


    console.log("LEAVING handleInputChange");
  }

  const handleSubmit = (event) => {
    console.log("ENTERING handleSubmit");

    event.preventDefault();

    const loginRequest = Object.assign({}, state);

    console.log(state);
    console.log(loginRequest);

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast("You're successfully logged in!", {
          theme: "colored",
        });
        props.history.push("/");
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
    console.log("LEAVING handleSubmit");
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
