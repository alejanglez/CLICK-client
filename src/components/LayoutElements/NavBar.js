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

  handleLogout = (profileInformation) => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      profileInformation,
    });
  };

  render() {
    const { role, authenticated } = this.state;

    console.log("authenticaded? ", authenticated);
    return (
      <>
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <p>hi</p>
          {authenticated && <Link to={`/profile`}> Profile </Link>}
          {authenticated && role === "user" && (
            <Link to={`/profile/list/`}>Profile list</Link>
          )}
          {authenticated && (
            <Link to={`/requested-services`}>requested services 🎄</Link>
          )}
          {authenticated && (
            <Link to={`/accepted-services`}>🎯accepted services 🎯</Link>
          )}
          {authenticated && (
            <Link to={"/"} onClick={this.handleLogout}>
              Logout
            </Link>
          )}
        </nav>
      </>
    );
  }
}

export default NavBar;
