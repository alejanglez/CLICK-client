import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  state = {
    role: this.props.role,
    authenticated: this.props.authenticated,
    profileInformation: this.props.profileInformation,
  };

  componentDidMount = () => {
    console.log("navbar mounted ", this.props);
    this.setState({
      role: this.props.role,
      authenticated: this.props.authenticated,
      profileInformation: this.props.profileInformation,
    });
  };

  render() {
    const { role, authenticated } = this.state;
    console.log("props nav", this.props);
    console.log("authenticaded? ", authenticated);
    return (
      <>
        <nav className="navbar fixed-bottom navbar-light bg-light align-middle">
          {authenticated && (
            <>
              <Link className=" align-middle nav-item" to={`/profile`}>
                {" "}
                Profile 👩🏽‍💻{" "}
              </Link>
              <Link className="nav-item" to={`/profile/list/`}>
                {" "}
                Profile list 📚
              </Link>
              <Link className="nav-item" to={`/requested-services`}>
                {" "}
                Requested services 🎄
              </Link>
              <Link className="nav-item" to={`/accepted-services`}>
                {" "}
                Accepted services 🎯
              </Link>
              <Link
                className="nav-item"
                to={"/"}
                onClick={() =>
                  this.props.handleLogout(this.props.profileInformation)
                }
              >
                Logout ⚡️
              </Link>
            </>
          )}
          {!authenticated && (
            <Link className="nav-item" to={"/signup"}>
              Signup
            </Link>
          )}
          {!authenticated && (
            <Link className=" align-middle nav-item" to={"/about"}>
              About
            </Link>
          )}
        </nav>
      </>
    );
  }
}

export default NavBar;
