import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/AppHeader.css";

function AppHeader(props) {

    return (
      <header className="app-header">
        <div className="container">
          <div className="app-branding">
            <Link to="/" className="app-title">
              MetHealth
            </Link>
          </div>
          <div className="app-options">
            <nav className="app-nav">
              {props.authenticated ? (
                <ul>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <a onClick={props.onLogout}>Logout</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    );

}

export default AppHeader;
