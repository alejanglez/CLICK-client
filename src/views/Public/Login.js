import React from "react";
import { login } from "../../services/profileInformationService";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    role: this.props.role,
  };

  componentDidMount = () => {
    console.log("state while login", this.state);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log("role props login ", this.props.role);
    console.log("authenticated props login ", this.props.sessionUserId);

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { role } = this.props;
    event.preventDefault();
    login(
      {
        email: this.state.email,
        password: this.state.password,
      },
      role
    )
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            localStorage.setItem("role", role),
            console.log("response login?", response),
            this.props.authenticate(
              response.profileInformation,
              localStorage.role,
              true
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
      <div className="view text-center p-3 p-3 p-md-5 m-md-3">
        {errorMessage !== "" && errorMessage}
        <h6 className="login-signup-p">We're glad to have you back</h6>
        <form onSubmit={this.handleSubmit}>
          <p className="login-signup-p">Email</p>
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            required={true}
            type="email"
            placeholder="elena@email.com"
          />
          <p className="login-signup-p">Password</p>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required={true}
            placeholder="******"
          />
          <button className="general-btn" type="submit">
            {" "}
            Login{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
