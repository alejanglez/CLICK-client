import React from "react";
import { Link } from "react-router-dom";
import AddImage from "../../components/LayoutElements/AddImage";
import { profile, signup } from "../../services/profileInformationService";

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
              localStorage.role
            ),
            this.props.history.push(`/${this.props.role}/profile`))
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
      imageUrl,
      lessonType,
      serviceCat,
      rate,
      facebookUrl,
      errorMessage,
    } = this.state;
    return (
      <div>
        <Link to={`/login/${this.props.role}`}>Login instead</Link>
        {errorMessage !== "" && errorMessage}

        <AddImage
          role={this.props.role}
          addImage={(imageUrl) => this.setState({ imageUrl })}
        />
        <form onSubmit={this.handleSubmit}>
          <label>first name: </label>
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>last name: </label>
          <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>address: </label>
          <input
            name="address"
            value={address}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <label>about: </label>
          <input
            name="about"
            value={about}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          {this.props.role == "provider" && (
            <>
              <label>Facebook Url: </label>
              <input
                name="facebookUrl"
                value={facebookUrl}
                onChange={this.handleChange}
                required={true}
                type="text"
              />
              <label>Online or in-person? </label>
              <select
                value={lessonType}
                onChange={this.handleChange}
                required={true}
                name="lessonType"
              >
                <option value="Online">Online</option>
                <option value="In-person">In-Person</option>
              </select>
              <label>Choose one category </label>
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
                <option value="English Lessonss">English Lessons</option>
                <option value="Math Lessons">Math Lessons</option>
                <option value="Baby Sitting">Baby Sitting</option>
              </select>
              <label>Rate </label>
              <input
                name="rate"
                value={rate}
                onChange={this.handleChange}
                required={true}
                type="number"
              />
            </>
          )}
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
          <button type="submit"> Sign up </button>
        </form>
      </div>
    );
  }
}

export default Signup;
