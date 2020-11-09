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
            <div id="emojis">
              <div id="heart">
                <img
                  class="logo"
                  src="./logohome.png"
                  width="100"
                  height="100"
                  alt="Logo"
                />
              </div>
            </div>
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
                  FAMILY
                </button>
              </Link>

              <Link to={"/signup/provider"}>
                <button
                  className="general-btn login"
                  onClick={() => this.props.changeRole("provider")}
                >
                  PROFESSIONAL
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
