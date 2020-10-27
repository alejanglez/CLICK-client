import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import "./App.css";
import AnonRoute from "./components/auth/AnonRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { validateSession } from "./services/profileInformationService";
import Login from "./views/User/Login";
import Profile from "./views/User/Profile";
import Signup from "./views/User/Signup";

class App extends React.Component {
  state = {
    authenticated: false,
    profileInformation: {},
    role: ""
  };
  

  componentDidMount = () => {
    console.log('component mounted')
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      validateSession(accessToken, this.state.role)
        .then((response) => {
          console.log(response, "RESPONSE");
          response.session.userId ? this.authenticate(response.session.userId,this.state.role): this.authenticate(response.session.providerId,this.state.role)
        })
        .catch((err) => console.log(err));
    }
  };

  authenticate = (profileInformation, role) => {
    console.log('prof inf', profileInformation)
    this.setState({
      authenticated: true,
      profileInformation,
      role,
    });
console.log('role: ', this.state.role)
  };

  handleLogout = (profileInformation) => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      profileInformation
    });
  };

  render() {
    const { authenticated, role } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
       {!authenticated && <div>
          <p>How do you want to use Click stranger?</p>
          <br/>
          {!authenticated && <Link to={"/signup/user"}><button onClick={()=>this.setState({role:"user"})}>User</button></Link>}
          {!authenticated && <Link to={"/signup/provider"}><button onClick={()=>this.setState({role:"provider"})}>Provider</button></Link>}
        </div>}
          <nav>
            {authenticated && <Link to={`/${this.state.role}/profile`}> Profile </Link>}
            {authenticated && (
              <Link to={"/"} onClick={this.handleLogout}>
                Logout
              </Link>
            )}
          </nav>
          <Switch>
            <PrivateRoute
              exact
              path={`/${role}/profile`}
              profileInformation={this.state.profileInformation}
              authenticated={authenticated}
              role={role}
              component={Profile}
            />
            <AnonRoute
              exact
              path={`/login/${role}`}
              authenticated={authenticated}
              authenticate={this.authenticate}
              role={role}
              component={Login}
            />
            <AnonRoute
              exact
              path={`/signup/${role}`}
              authenticated={authenticated}
              authenticate={this.authenticate}
              role={role}
              component={Signup}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
