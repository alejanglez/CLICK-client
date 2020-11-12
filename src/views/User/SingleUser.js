import React, { Component } from "react";
import { getSingleUserprofile } from "../../services/profilesService";
import Profile from "./Profile";

class SingleUser extends Component {
  state = {
    user: {},
  };

  componentDidMount = () => {
    const id = this.props.match.params.userId;

    getSingleUserprofile(id).then((response) => {
      console.log("single user", response);
      this.setState({
        user: response.data,
      });
    });
  };

  render() {
    const { user } = this.state;
    console.log("user on single?", user);
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <Profile
          path={`/profile/:userId`}
          exact
          component={Profile}
          profileInformation={user}
        />
      </div>
    );
  }
}

export default SingleUser;
