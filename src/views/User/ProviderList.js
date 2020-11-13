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
      <div className="text-center p-4">
        <h4 className="alignleft">
          <strong>Provider's list</strong>
        </h4>
        <div className="filter">
          <div>
            <p className="login-signup-p">Filter by category</p>
          </div>
          <div>
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
                <div className="flexCard">
                  <div>
                    {!provider.imageUrl && (
                      <img
                        className="rounded img-fluid profile-image"
                        src="/public/providerAvatar.png"
                        alt="provider"
                      />
                    )}
                    <div
                      className="profilePic"
                      style={{
                        backgroundImage: "url(" + provider.imageUrl + ")",
                      }}
                    ></div>
                  </div>
                  <div className="cardDetails">
                    <h4>
                      <strong>
                        {provider.firstName} {provider.lastName}
                      </strong>
                    </h4>
                    <p className="categoryPublic">{provider.serviceCat}</p>
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="rgba(252, 3, 244, 0.5)"
                      >
                        <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                      </svg>{" "}
                      {provider.address}
                    </p>
                  </div>
                </div>
                {
                  <Link
                    className="link-react"
                    to={`/profile/list/` + provider._id}
                  >
                    <button className="general-btn">
                      See detailed profile
                    </button>
                  </Link>
                }
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProviderList;
