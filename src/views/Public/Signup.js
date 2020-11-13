import React from "react";
import { Link } from "react-router-dom";
import AddImage from "../../components/LayoutElements/AddImage";
import { signup } from "../../services/profileInformationService";

class Signup extends React.Component {
  state = {
    firstName: "",
    email: "",
    password: "",
    lastName: "",
    address: "",
    about: "",
    lessonType: "Online",
    serviceCat: "Informatics",
    aptitudes: [],
    rate: 0,
    facebookUrl: "",
    imageUrl: "",
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log("role props signup ", this.props.role);
    console.log("authenticated props signup ", this.props.authenticated);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signup(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        about: this.state.about,
        email: this.state.email,
        password: this.state.password,
        imageUrl: this.state.imageUrl,
        lessonType: this.state.lessonType,
        serviceCat: this.state.serviceCat,
        aptitudes: [],
        rate: this.state.rate,
        facebookUrl: this.state.facebookUrl,
      },
      this.props.role
    )
      .then((response) =>
        response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),
            localStorage.setItem("role", this.props.role),
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
      .catch((err) => console.log(err));
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      about,
      lessonType,
      serviceCat,
      rate,
      facebookUrl,
      errorMessage,
    } = this.state;
    return (
      <div className="view text-center p-3 p-3 p-md-5 m-md-3">
        <p>
          Do you already have an account?
          <br />
          <Link className="link-react" to={`/login/${this.props.role}`}>
            Login instead
          </Link>
        </p>
        <hr />
        <div>
          {errorMessage !== "" && errorMessage}
          <p className="login-signup-p">Choose your profile picture*</p>
          <AddImage
            role={this.props.role}
            addImage={(imageUrl) => this.setState({ imageUrl })}
          />
          <form onSubmit={this.handleSubmit}>
            <p className="login-signup-p">First Name</p>
            <input
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              required={true}
              type="text"
              placeholder="Elena"
            />
            <p className="login-signup-p">Last Name</p>
            <input
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              required={true}
              type="text"
              placeholder="Jones"
            />
            <p className="login-signup-p">Your address</p>
            <input
              name="address"
              value={address}
              onChange={this.handleChange}
              required={true}
              type="text"
              placeholder="First Street, 5, 1000-101, Madrid"
            />
            <p className="login-signup-p">Profile bio</p>
            <input
              name="about"
              value={about}
              onChange={this.handleChange}
              required={true}
              type="text"
              placeholder="I'm Elena and I work in Informatics for 3 years."
            />
            {this.props.role === "provider" && (
              <>
                <p className="login-signup-p">Your Facebook Url</p>
                <input
                  name="facebookUrl"
                  value={facebookUrl}
                  onChange={this.handleChange}
                  required={true}
                  type="text"
                  placeholder="www.facebook.com/elena"
                />
                <p className="login-signup-p">
                  Choose if you'd like to provide services online or in-person
                </p>
                <select
                  value={lessonType}
                  onChange={this.handleChange}
                  required={true}
                  name="lessonType"
                >
                  <option value="Online">Online</option>
                  <option value="In-person">In-Person</option>
                </select>
                <p className="login-signup-p">Choose your service category</p>
                <select
                  value={serviceCat}
                  onChange={this.handleChange}
                  required={true}
                  name="serviceCat"
                >
                  <option value="Academic Support">Academic Support</option>
                  <option value="Informatics">Informatics</option>
                  <option value="Guitar Lessons">Guitar Lessons</option>
                  <option value="Piano Lessons">Piano Lessons</option>
                  <option value="English Lessons">English Lessons</option>
                  <option value="Math Lessons">Math Lessons</option>
                  <option value="Baby Sitting">Baby Sitting</option>
                </select>
                <p className="login-signup-p">Rating per hour</p>
                <input
                  name="rate"
                  value={rate}
                  onChange={this.handleChange}
                  required={true}
                  type="number"
                  placeholder="30"
                />
              </>
            )}
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
              Sign up{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
