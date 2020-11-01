import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getAllProviderprofile,
  searchProviderprofile,
} from "../../services/profilesService";
import "./ProviderList.css";

class ProviderList extends Component {
  state = {
    providers: [],
    query: "",
    role: this.props.role,
    profileInformation: [],
  };

  componentDidMount = () => {
    this.fetchData();
    console.log("this state", this.state);
  };

  componentDidUpdate = () => {
    searchProviderprofile(this.state.query)
      .then((response) => {
        console.log("response on update", response);
      })
      .catch((err) =>
        console.log("Error retrieving filtered providers: ", err)
      );
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

  // handleInputChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchProviderShearch();
  };

  fetchProviderShearch = async () => {
    const response = await searchProviderprofile(this.state.searchParams);
    this.setState({
      searchResults: response,
    });
  };

  render() {
    return (
      <div className="container">
        <h2>Provider's list 💙</h2>
        {
          <div className="header">
            <Link to={"/"}></Link>
          </div>
        }
        {
          <div>
            {/* <input
              className="search-bar"
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
            /> */}
            <form onSubmit={this.handleSubmit}>
              <input
                name="searchParams"
                placeholder="Search by serviceCat"
                onChange={this.handleChange}
                type="text"
              />
              <button type="submit"> Search </button>
            </form>
          </div>
        }
        {this.state.providers.map((provider) => {
          return (
            <div className="card" key={provider._id}>
              {<Link to={`/profile/list/` + provider._id}>Details</Link>}
              <img
                className="card-img-top cardPicture"
                src={provider.imageUrl}
                alt={provider._id}
              />
              <div className="card-body">
                <h2>{provider.firstName}</h2>
                <h3>{provider.lastName}</h3>
                <h3>{provider.serviceCat}</h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProviderList;
