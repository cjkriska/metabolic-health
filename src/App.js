import React, { Component, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

  const handleSetAuth = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                authenticated ? (
                  <Profile
                    currentUser={currentUser}
                    path="/profile"
                  />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )

              }
            />
            <Route
              path="/login"
              element={<Login loadUser={loadCurrentlyLoggedInUser} authenticated={authenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup authenticated={authenticated} />}
            />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler loadUser={loadCurrentlyLoggedInUser} authenticated={authenticated}/>}
            />
            <Route element={<NotFound/>} />
          </Routes>
        </div>

        <ToastContainer position="bottom-right" />

      </div>
    );
}

export default App;
