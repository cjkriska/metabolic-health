import React, { Component, useEffect } from "react";
import { ACCESS_TOKEN } from "./constants.js";
import { Navigate, Route, useLocation } from "react-router-dom";

function OAuth2RedirectHandler(props) {

    const location = useLocation();

    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

      var results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    const token = getUrlParameter("token");
    const error = getUrlParameter("error");
  
    if(token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      props.loadUser();
    }

    return token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />

}

export default OAuth2RedirectHandler;
