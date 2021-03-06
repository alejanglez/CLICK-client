import React, { Component } from "react";
import MakeRequest from "../../components/LayoutElements/MakeRequest";

import { getSingleProviderprofile } from "../../services/profilesService";
import Profile from "./Profile";

class SingleProvider extends Component {
  state = {
    provider: {},
    userId: "",
    showComponent: false,
    spectator: "spectator",
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

  handleMakeRequestComponent = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  };

  render() {
    const { provider, userId, spectator } = this.state;
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <button
          className="general-btn"
          onClick={this.handleMakeRequestComponent}
        >
          Make a request
        </button>
        {this.state.showComponent ? (
          <MakeRequest userId={userId} profileInformation={provider} />
        ) : null}
        <Profile
          path={`/profile/list/:providerId`}
          exact
          component={Profile}
          profileInformation={provider}
          spectator={spectator}
        />
      </div>
    );
  }
}

export default SingleProvider;
