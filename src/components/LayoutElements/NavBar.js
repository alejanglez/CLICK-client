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
        <nav className="navbar fixed-bottom navbar-light bg align-middle">
          {authenticated && (
            <>
              <Link className=" align-middle nav-item" to={`/profile`}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-person-circle"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                  <path
                    fill-rule="evenodd"
                    d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                  />
                </svg>
              </Link>
              <Link className="nav-item" to={`/profile/list/`}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-search"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                </svg>
              </Link>
              <Link className="nav-item" to={`/requested-services`}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-calendar-check-fill"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />
                </svg>
              </Link>
              <div>
                <div className="collapse" id="navbarToggleExternalContent">
                  <div className="bg-dark p-4">
                    <h5 className="text-white h4">Collapsed content</h5>
                    <span className="text-muted">
                      Toggleable via the navbar brand.
                    </span>
                  </div>
                </div>
                <nav className="navbar navbar-dark bg-dark">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarToggleExternalContent"
                    aria-controls="navbarToggleExternalContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                </nav>
              </div>
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
