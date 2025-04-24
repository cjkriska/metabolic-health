import React, { Component, useEffect } from "react";
import { ACCESS_TOKEN } from "./constants.js";
import { Redirect } from "react-router-dom";

function OAuth2RedirectHandler(props) {

    useEffect(() => {
       handleOAuthLogin();
    }, []);

    const getUrlParameter = (name) => {
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

      console.log(props.location);

      var results = regex.exec(props.location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    console.log("ENTERING OAuth2RedirectHandler Component render");
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");
  
    const handleOAuthLogin = () => {
      if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        props.handleAuth(true);
        props.loadUser();
      }
    }

    return token ?
        <Redirect
          to={{
            pathname: "/profile",
            state: {
              from: props.location,
            },
          }}
        /> :
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: props.location,
              error: error,
            },
          }}
        />

    // if (token) {
    //   localStorage.setItem(ACCESS_TOKEN, token);
    //   props.handleAuth(true);
    //   props.loadUser();
    //   console.log("JUST AFTER set ACCESS_TOKEN of OAuth2RedirectHandler Component render");
    //
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/profile",
    //         state: {
    //           from: props.location,
    //         },
    //       }}
    //     />
    //   );
    // } else {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/login",
    //         state: {
    //           from: props.location,
    //           error: error,
    //         },
    //       }}
    //     />
    //   );
    // }
}

export default OAuth2RedirectHandler;
