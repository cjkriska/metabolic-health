import React, { Component, useState, useEffect } from "react";
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

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      console.log("ENTERING useEffect 1 at " + Math.floor(Date.now() / 1000));
      loadCurrentlyLoggedInUser();
      console.log("LEAVING useEffect 1 at " + Math.floor(Date.now() / 1000));
    }
  }, []);
  
  useEffect(() => {
      console.log("ENTERING useEffect 2 at " + Math.floor(Date.now() / 1000));
      loadCurrentlyLoggedInUser();
      console.log("LEAVING useEffect 2 at " + Math.floor(Date.now() / 1000));
  }, []);
  
  const loadCurrentlyLoggedInUser = () => {
    console.log("ENTERING loadCurrentlyLoggedInUser()");
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    console.log("LEAVING loadCurrentlyLoggedInUser()");
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("You're safely logged out!", {
      theme: "colored",
    });
  }

  const handleAuth = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
  }

  if(loading) {
    return <LoadingIndicator />
  }


    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader
            authenticated={authenticated}
            onLogout={handleLogout}
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
              render={() => (
                console.log("ENTERING /profile ROUTE IN APP.JS"),
                console.log("Is authenticated?: " + authenticated),
                console.log("Current User: " + currentUser),
                authenticated ? (
                  <Profile
                    currentUser={currentUser}
                    path="/profile"
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/login",
                    }}
                  />
                )
              )
              }
            />
            <Route
              path="/login"
              render={(props) => (
                <Login authenticated={authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              render={(props) => (
                <OAuth2RedirectHandler setAuthentication={handleAuth} authenticated={authenticated} {...props} />
              )}
            ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>

        <ToastContainer />

      </div>
    );
}

export default App;
