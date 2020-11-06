import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/profileInformationService";
import Login from "./views/User/Login";
import Profile from "./views/User/Profile";
import ProviderList from "./views/User/ProviderList";
import SingleProvider from "./views/User/SingleProvider";
import SingleUser from "./views/User/SingleUser";
// import ProfilesFeed from "./views/User/ProfilesList";
import Signup from "./views/User/Signup";
import MakeRequest from "./components/LayoutElements/MakeRequest";
import RequestedServices from "./views/User/RequestedServices";
import EditProfile from "./views/User/EditProfile";
import AcceptedServices from "./views/User/AcceptedServices";
import NavBar from "./components/LayoutElements//NavBar";
import Post from "./views/User/Post";

class App extends React.Component {
  state = {
    authenticated: false,
    profileInformation: {},
    role: "",
    sessionUserId: "",
    sessionProviderId: "",
  };

  componentDidMount = () => {
    console.log("component mounted");
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role") || "";

    this.setState(
      {
        role,
      },
      () => {
        if (accessToken) {
          // console.log("role local storage ", role);
          validateSession(accessToken, this.state.role)
            .then((response) => {
              console.log(response, "RESPONSE");
              console.log(response.session.userId._id, "RESPONSE USER ID");
              this.setState({
                sessionProviderId: response.session.providerId,
                sessionUserId: response.session.userId,
              });
              response.session.userId
                ? this.authenticate(response.session.userId, this.state.role)
                : this.authenticate(
                    response.session.providerId,
                    this.state.role
                  );
            })
            .catch((err) => console.log(err));
        }
      }
    );
  };

  authenticate = (profileInformation, role) => {
    this.setState({
      authenticated: true,
      profileInformation,
      role,
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
    const {
      authenticated,
      role,
      profileInformation,
      sessionProviderId,
      sessionUserId,
    } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          {authenticated && (
            <NavBar
              authenticated={this.state.authenticated}
              role={this.state.role}
              profileInformation={this.state.profileInformation}
            />
          )}

          {!authenticated && (
            <div>
              <p>How do you want to use Click stranger?</p>
              <br />
              {!authenticated && (
                <Link to={"/signup/user"}>
                  <button onClick={() => this.setState({ role: "user" })}>
                    User
                  </button>
                </Link>
              )}
              {!authenticated && (
                <Link to={"/signup/provider"}>
                  <button onClick={() => this.setState({ role: "provider" })}>
                    Provider
                  </button>
                </Link>
              )}
            </div>
          )}
          <nav>
            {authenticated && <Link to={`/profile`}> Profile </Link>}
            {authenticated && this.state.role === "user" && (
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
          <Switch>
            {/* shows my profile as I sign up/log in */}

            <PrivateRoute
              exact
              path={`/profile/`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              sessionUserId={sessionUserId}
              sessionProviderId={sessionProviderId}
              component={Profile}
            />
            {/* shows the provider list/feed */}
            <PrivateRoute
              exact
              path={`/profile/list`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={ProviderList}
            />
            <PrivateRoute
              exact
              path={`/profile/list/:providerId`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={SingleProvider}
            />
            <PrivateRoute
              exact
              path={`/profile/list/:userId`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={SingleUser}
            />
            <PrivateRoute
              exact
              path={`/requested-services`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={RequestedServices}
            />
            <PrivateRoute
              exact
              path={`/accepted-services`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={AcceptedServices}
            />
            <AnonRoute
              exact
              path={`/login/${role}`}
              authenticated={authenticated}
              authenticate={this.authenticate}
              role={role}
              component={Login}
              sessionUserId={sessionUserId}
              sessionProviderId={sessionProviderId}
            />
            <AnonRoute
              exact
              path={`/signup/:${role}`}
              authenticated={authenticated}
              authenticate={this.authenticate}
              role={role}
              component={Signup}
            />

            <PrivateRoute
              exact
              path={`/profile/editProfile`}
              authenticated={authenticated}
              authenticate={this.authenticate}
              profileInformation={this.state.profileInformation}
              role={role}
              component={EditProfile}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
