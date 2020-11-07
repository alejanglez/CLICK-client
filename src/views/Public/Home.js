import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    authenticated: this.props.authenticated,
    role: this.props.role,
  };

  render() {
    console.log("props home", this.props);
    const { authenticated, role } = this.state;
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        {!authenticated && (
          <div>
            <p>How do you want to use Click stranger?</p>
            <br />

            <Link to={"/signup/user"}>
              <button onClick={() => this.props.changeRole("user")}>
                User
              </button>
            </Link>

            <Link to={"/signup/provider"}>
              <button onClick={() => this.props.changeRole("provider")}>
                Provider
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
