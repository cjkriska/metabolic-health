import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Navigate
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
          replace
        />
      )
    }
  />
);

export default PrivateRoute;
