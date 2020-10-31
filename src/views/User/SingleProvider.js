import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import { getSingleProviderprofile } from "../../services/profilesService";
import Profile from "./Profile";

class SingleProvider extends Component {
  state = {
    provider: {},
  };

  componentDidMount = () => {
    const id = this.props.match.params.providerId;
    console.log("provider id", this.props);

    getSingleProviderprofile(id).then((response) => {
      this.setState({
        provider: response.data,
      });
    });
  };

  render() {
    const { provider } = this.state;
    return (
      <div>
        <Profile
          path={`/profile/list/:providerId`}
          exact
          component={Profile}
          profileInformation={provider}
        />
      </div>
    );
  }
}

export default SingleProvider;
