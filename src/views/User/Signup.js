import React from "react";
import {profile, signup} from '../../services/profileInformationService'

class Signup extends React.Component {
  state = {
    firstName: "",
    email: "",
    password: "",
    lastName:"",
    address:"", 
    about:"",
    lessonType:"Online",
    serviceCat:"Informatics",
    aptitudes:[],
    rate:0,
    facebookUrl:"",
    // imageUrl:"",
    errorMessage: "",
    role: this.props.role
  };

  componentDidMount = (props) => {
console.log('props mount signuo ', this.props.role)
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log('role props signup ',this.props.role)
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      about: this.state.about,
      email: this.state.email,
      password: this.state.password,
      // imageUrl: this.state.imageUrl,
      lessonType:"Online",
      serviceCat:"Informatics",
      aptitudes:[],
      rate:0,
      facebookUrl:"",
      role: this.state.role

    }, this.props.role)
      .then((response) =>  
  response.accessToken
          ? (localStorage.setItem("accessToken", response.accessToken),localStorage.setItem( "role", this.props.role),
            this.props.authenticate(response.profileInformation, this.props.role),
            this.props.history.push(`/${this.props.role}/profile`))
          : this.setState({
              errorMessage: response.errorMessage,
            })
      )
      .catch((err) => console.log(err));
      };

  // componentWillUnmount = () => {
  //   profile({
  //     userId: this.state.profileInformation._id
  //   }, this.state.role)
  //   .then(response => console.log('profile response ', response.data))
  // }

  render() {
    const { firstName, lastName, email, password, address, about, imageUrl, lessonType, serviceCat, rate, facebookUrl, errorMessage } = this.state;
    return (
      <div>
        {errorMessage !== "" && errorMessage}
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