import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  profileInformation,
  role,
  sessionUserId,
  sessionProviderId,
  ...rest
}) => {
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component
            {...props}
            profileInformation={profileInformation}
            role={role}
            sessionUserId={sessionUserId}
            sessionProviderId={sessionProviderId}
          />
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
