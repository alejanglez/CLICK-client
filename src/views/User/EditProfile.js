import React from "react";
import AddImage from "../../components/LayoutElements/AddImage";
import ChangePassword from "../../components/LayoutElements/ChangePassword";

import { editProfile } from "../../services/profileInformationService";

class EditProfile extends React.Component {
  state = {
    firstName: this.props.profileInformation.firstName,
    email: this.props.profileInformation.email,
    lastName: this.props.profileInformation.lastName,
    address: this.props.profileInformation.address,
    about: this.props.profileInformation.about,
    lessonType: this.props.profileInformation.lessonType,
    serviceCat: this.props.profileInformation.serviceCat,
    aptitudes: this.props.profileInformation.aptitudes,
    rate: this.props.profileInformation.rate,
    facebookUrl: this.props.profileInformation.facebookUrl,
    imageUrl: this.props.profileInformation.imageUrl,
    errorMessage: "",
    role: this.props.role,
    id: this.props.profileInformation._id,
    showComponent: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log("role props edit ", this.props.role);
    this.setState({
      [name]: value,
    });
  };

  handleChangePassword = () => {
    this.setState({
      showComponent: !this.state.showComponent,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { role } = this.state;
    editProfile(
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
        aptitudes: this.state.aptitudes,
        rate: this.state.rate,
        facebookUrl: this.state.facebookUrl,
      },
      this.props.role,
      this.props.profileInformation._id
    )
      .then((response) =>
        response
          ? ((role === "user" &&
              this.props.authenticate(response.user, localStorage.role),
            console.log("response user", response),
            this.props.history.push(`/profile`)),
            (role === "provider" &&
              this.props.authenticate(response.provider, localStorage.role),
            console.log("response provider", response),
            this.props.history.push(`/profile`)))
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
      address,
      about,
      lessonType,
      serviceCat,
      rate,
      facebookUrl,
      id,
      role,
    } = this.state;
    console.log("props edit", this.props);
    return (
      <div className="view p-3">
        <div className="align-left changePw">
          <h6>
            <strong>Do you want to change your password?</strong>
          </h6>
          <button
            className={role === "user" ? "edit-btn-user" : "edit-btn-provider"}
            onClick={this.handleChangePassword}
          >
            Changing password only
          </button>
        </div>
        <hr />
        {this.state.showComponent ? (
          <ChangePassword role={this.props.role} id={id} />
        ) : null}
        <h6 className="login-signup-p">
          <strong>Edit your profile details below</strong>
        </h6>
        <br />
        <AddImage
          role={this.props.role}
          addImage={(imageUrl) => this.setState({ imageUrl })}
        />
        <form onSubmit={this.handleSubmit}>
          <p className="login-signup-p">First name</p>
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <p className="login-signup-p">Last name</p>
          <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <p className="login-signup-p">Your address</p>
          <input
            name="address"
            value={address}
            onChange={this.handleChange}
            required={true}
            type="text"
          />
          <p className="login-signup-p">Profile bio</p>
          <input
            name="about"
            value={about}
            onChange={this.handleChange}
            required={true}
            type="text"
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
                <option value="English Lessonss">English Lessons</option>
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
          />
          {}
          <button
            className={role === "user" ? "edit-btn-user" : "edit-btn-provider"}
            type="submit"
          >
            {" "}
            Confirm{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
