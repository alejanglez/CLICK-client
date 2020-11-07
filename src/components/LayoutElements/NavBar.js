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
        <nav className="navbar fixed-bottom navbar-light bg-light">
          {authenticated && (
            <>
              <Link to={`/profile`}> Profile 👩🏽‍💻 </Link>
              <Link to={`/profile/list/`}> Profile list 📚</Link>
              <Link to={`/requested-services`}> Requested services 🎄</Link>
              <Link to={`/accepted-services`}> Accepted services 🎯</Link>
              <Link
                to={"/"}
                onClick={() =>
                  this.props.handleLogout(this.props.profileInformation)
                }
              >
                Logout ⚡️
              </Link>
            </>
          )}
          {/* {authenticated && (
            <Link to={"/"} onClick={this.handleLogout}>
              Logout
            </Link>
          )} */}
          {!authenticated && <Link to={"/signup"}>Signup</Link>}
          {!authenticated && <Link to={"/about"}>About</Link>}
        </nav>
      </>
    );
  }
}

export default NavBar;
