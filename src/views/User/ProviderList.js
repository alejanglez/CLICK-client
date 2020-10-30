import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getAllProviderprofile,
  filterProviderprofile,
} from "../../services/profilesService";

class ProviderList extends Component {
  state = {
    providers: [],
    query: "",
    role: this.props.role,
  };

  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = () => {
    filterProviderprofile(this.state.query)
      .then((response) => {
        this.setState({
          providers: response,
        });
      })
      .catch((err) =>
        console.log("Error retrieving filtered providers: ", err)
      );
  };

  fetchData = () => {
    getAllProviderprofile()
      .then((response) => {
        console.log(response);
        this.setState({
          providers: response,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <Link to={"/"}></Link>
        </div>
        <div>
          <input
            className="search-bar"
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </div>
        {this.state.providers.map((provider) => {
          return (
            <div key={provider._id}>
              <Link
                to={"/provider/profile/list/" + provider._id}
                className="beer-card"
              >
                <img src={provider.image_url} alt={provider._id} />
                <div className="beer-tag">
                  <h2>{provider.firstName}</h2>
                  <h3>{provider.lastName}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProviderList;
