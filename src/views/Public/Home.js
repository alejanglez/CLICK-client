import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

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
          <div className="home">
            <h2>Welcome to Click App</h2>
            <p>
              To start using the app, choose if you are a familiy looking for a
              service, or you have a service to offer
            </p>
            <div className="login-btns">
              <Link to={"/signup/user"}>
                <button
                  className="general-btn login"
                  onClick={() => this.props.changeRole("user")}
                >
                  I want to request services
                </button>
              </Link>

              <Link to={"/signup/provider"}>
                <button
                  className="general-btn login"
                  onClick={() => this.props.changeRole("provider")}
                >
                  I am a service provider
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
