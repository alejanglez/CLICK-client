import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

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
        {/* <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          fixed="bottom"
        >
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
        <Navbar
          collapseOnSelect
          expand="lg"
          fixed="bottom"
          fixed="bottom"
          className="mr-auto navbar fixed-bottom navbar-light bg align-middle"
        >
          {authenticated && (
            <>
              <Nav.Link
                className=" align-middle nav-item"
                as={Link}
                to={`/profile`}
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-person-circle"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                  <path
                    fillRule="evenodd"
                    d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fillule="evenodd"
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                  />
                </svg>
              </Nav.Link>
              {role === "user" && (
                <Nav.Link className="nav-item" as={Link} to={`/profile/list/`}>
                  <svg
                    width="2em"
                    height="2em"
                    viewBox="0 0 16 16"
                    className="bi bi-search"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                    />
                  </svg>
                </Nav.Link>
              )}

              <Nav.Link
                className="nav-item"
                as={Link}
                to={`/requested-services`}
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-calendar-check-fill"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />
                </svg>
              </Nav.Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <Nav.Link
                    as={Link}
                    to={"/"}
                    onClick={() =>
                      this.props.handleLogout(this.props.profileInformation)
                    }
                  >
                    Logout
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/aboutClick"}>
                    About
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {!authenticated && (
            <Nav.Link className="nav-item navAnon" as={Link} to={"/"}>
              Signup
            </Nav.Link>
          )}
          {!authenticated && (
            <Nav.Link
              className=" align-middle nav-item navAnon"
              as={Link}
              to={"/about"}
            >
              About
            </Nav.Link>
          )}
        </Navbar>
      </>
    );
  }
}

export default NavBar;
