import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getSingleProviderprofile } from "../../services/profilesService";

class SingleProvider extends Component {
  state = {
    provider: {},
  };

  componentDidMount = () => {
    const id = this.props.match.params.id;

    getSingleProviderprofile(id).then((response) => {
      this.setState({
        provider: response.profileInformation,
      });
    });
  };

  render() {
    const provider = this.state.provider;
    return (
      <div>
        <div className="header">
          <Link to={"/"}>
            <img src="/images/home.png" alt="home.png" />
          </Link>
        </div>
        <div class="single-beer-card">
          <img src={provider.image_url} alt={provider._id} />
          <div className="head">
            <div className="title-tag">
              <h1>{provider.firstName}</h1>
              <h3>{provider.lastName}</h3>
            </div>
            <div className="title-numbers">
              <h2>{provider.serviceCat}</h2>
              <p className="first-brewed">{provider.rate}</p>
            </div>
          </div>
          <div className="beer-description">
            <p>{provider.aptitudes}</p>
            <p className="author">{provider.facebookUrl}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProvider;
