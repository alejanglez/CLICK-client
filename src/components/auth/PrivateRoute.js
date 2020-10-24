import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  userInformation,
  role,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component {...props} userInformation={userInformation} role={role} />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
