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
            console.log("response login?", response),
            this.props.authenticate(
              response.profileInformation,
              localStorage.role,
              true
            ),
            this.props.history.push(
              `/profile`
              // {
              //   pathname: "/profile",
              //   state: {
              //     test: response.accessToken,
              //   },
              // }
            ))
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
      <div className="view text-center p-3 p-md-5 m-md-3">
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
