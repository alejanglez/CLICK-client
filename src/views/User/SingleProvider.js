import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import MakeRequest from "../../components/LayoutElements/MakeRequest";

import { getSingleProviderprofile } from "../../services/profilesService";
import Profile from "./Profile";
import Review from "./Review";

class SingleProvider extends Component {
  state = {
    provider: {},
    userId: "",
  };

  componentDidMount = () => {
    const id = this.props.match.params.providerId;
    console.log("provider id", this.props);
    console.log("user id?? ", this.props.profileInformation._id);

    this.setState({ userId: this.props.profileInformation._id });
    getSingleProviderprofile(id).then((response) => {
      this.setState({
        provider: response.data,
      });
    });
  };

  render() {
    const { provider, userId } = this.state;
    return (
      <div>
        <Profile
          path={`/profile/list/:providerId`}
          exact
          component={Profile}
          profileInformation={provider}
        />
        <Review
          path={`/review/list/:providerId`}
          exact
          component={Review}
          profileInformation={provider}
        />
        <MakeRequest userId={userId} profileInformation={provider} />
      </div>
    );
  }
}

export default SingleProvider;
