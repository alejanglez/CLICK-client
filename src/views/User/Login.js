import React from "react";
import {login} from "../../services/profileInformationService";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const {role, profileInformation} = this.props
    event.preventDefault();
    login({
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            this.props.authenticate(response.profileInformation),
            this.props.history.push(`/${role}/profile`))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { email, password, errorMessage } = this.state;
    return (
      <div>
        {errorMessage !== "" && errorMessage}
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
          />
          <button type="submit"> Login </button>
        </form>
      </div>
    );
  }
}

export default Login;
