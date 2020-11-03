import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { getSingleUserprofile } from "../../services/profilesService";
import Profile from "./Profile";

class SingleUser extends Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    const id = this.props.match.params.userId;
    // console.log("user id", this.props);

    getSingleUserprofile(id).then((response) => {
      this.setState({
        user: response.data,
      });
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        <Profile
          path={`/profile/list/:userId`}
          exact
          component={Profile}
          profileInformation={user}
        />
      </div>
    );
  }
}

export default SingleUser;
