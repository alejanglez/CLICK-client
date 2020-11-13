import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./styles.css";
import "./styles.scss";
import ReactPlayer from "react-player";

class Home extends React.Component {
  state = {
    authenticated: this.props.authenticated,
  };

  render() {
    console.log("props home", this.props);
    const { authenticated } = this.state;
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        {!authenticated && (
          <div className="home">
            <div id="emojis">
              <div id="emojis">
                <span id="heart">
                  <img
                    className="logo"
                    src="./logohome.png"
                    width="100"
                    height="100"
                    alt="Logo"
                  />
                </span>
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
            <div className="video">
              <video
                src="/videos/video.mp4"
                playsinline="playsinline"
                autoplay="autoplay"
                muted="muted"
                loop="loop"
                width="100%"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
