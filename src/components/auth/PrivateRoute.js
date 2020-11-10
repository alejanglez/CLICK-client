import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authenticated,
  profileInformation,
  role,
  sessionUserId,
  sessionProviderId,
  authenticate,
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
            authenticate={authenticate}
            authenticated={authenticated}
          />
        ) : (
          <Redirect to="/profile" />
        )
      }
      {...rest}
    />
  );
};
export default PrivateRoute;
