import React from "react";
import { Route, Redirect } from "react-router-dom";
const AnonRoute = ({
  component: Component,
  authenticated,
  authenticate,
  role,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated === false ? (
          <Component {...props} authenticate={authenticate} role={role}/>
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};

export default AnonRoute;
