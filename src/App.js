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
      loadCurrentlyLoggedInUser();
    }
  }, []);
  
  useEffect(() => {
      loadCurrentlyLoggedInUser();
  }, []);
  
  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    toast.success("You're safely logged out!", {
      theme: "colored",
    });
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
                console.log(authenticated),
                console.log(currentUser),
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
              component={OAuth2RedirectHandler}
            ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>

        <ToastContainer />

      </div>
    );
}

export default App;
