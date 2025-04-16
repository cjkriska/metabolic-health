import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppHeader from "./AppHeader.js";
import Home from "./Home.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Profile from "./Profile.js";
import OAuth2RedirectHandler from "./OAuth2RedirectHandler.js";
import NotFound from "./NotFound.js";
import LoadingIndicator from "./LoadingIndicator.js";
import { getCurrentUser } from "./APIUtils.js";
import { ACCESS_TOKEN } from "./constants.js";
import PrivateRoute from "./PrivateRoute.js";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    toast.success("You're safely logged out!", {
      theme: "colored",
    });
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            /> */}
            <Route
              path="/profile"
              render={() =>
                this.state.authenticated ? (
                  <Profile
                    currentUser={this.state.currentUser}
                    path="/profile"
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                    }}
                  />
                )
              }
            />
            <Route
              path="/login"
              render={(props) => (
                <Login authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              component={OAuth2RedirectHandler}
            ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <ToastContainer />
        {/* <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        /> */}
      </div>
    );
  }
}

export default App;
