import React from "react";
import { login } from "../../services/profileInformationService";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    role: this.props.role,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    console.log("role props login ", this.props.role);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { role, email, password } = this.props;
    event.preventDefault();
    login(
      {
        email: this.state.email,
        password: this.state.password,
      },
      this.props.role
    )
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            localStorage.setItem("role", this.props.role),
            this.props.authenticate(
              response.profileInformation,
              localStorage.role
            ),
            this.props.history.push(`/profile`))
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
