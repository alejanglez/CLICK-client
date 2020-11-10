import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllProviderprofile } from "../../services/profilesService";
import "./ProviderList.css";

class ProviderList extends Component {
  state = {
    providers: [],
    query: "",
    role: this.props.role,
    profileInformation: [],
    searchParams: "",
  };

  componentDidMount = () => {
    this.fetchData();
    console.log("this state", this.state);
  };

  fetchData = () => {
    getAllProviderprofile()
      .then((response) => {
        console.log("response list", response.providerProfiles);
        this.setState({
          providers: response.providerProfiles,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <h2>Provider's list</h2>
        <div>
          <p>Filter by category</p>
          <select
            className="input is-primary"
            name="searchParams"
            placeholder="Informatics"
            onChange={this.handleChange}
            type="text"
            value={this.state.searchParams}
          >
            <option value="Academic Support">Academic Support</option>
            <option value="Informatics">Informatics</option>
            <option value="Guitar Lessons">Guitar Lessons</option>
            <option value="Piano Lessons">Piano Lessons</option>
            <option value="English Lessonss">English Lessons</option>
            <option value="Math Lessons">Math Lessons</option>
            <option value="Baby Sitting">Baby Sitting</option>
            <option value="">All</option>
          </select>
        </div>

        {this.state.providers
          .filter((provider) =>
            provider.serviceCat
              .toLocaleLowerCase()
              .includes(this.state.searchParams.toLocaleLowerCase())
          )
          .map((provider) => {
            return (
              <div className="card" key={provider._id}>
                {<Link to={`/profile/list/` + provider._id}>Details</Link>}

                {!provider.imageUrl && (
                  <img
                    className="rounded img-thumbnail img-fluid profile-image"
                    src="/public/providerAvatar.png"
                    alt="provider"
                  />
                )}
                <img
                  className="card-img-top cardPicture"
                  src={provider.imageUrl}
                  alt={provider._id}
                />
                <div className="card-body">
                  <h2>{provider.firstName}</h2>
                  <h3>{provider.lastName}</h3>
                  <h3>category 🗣: {provider.serviceCat}</h3>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProviderList;
