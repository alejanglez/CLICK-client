import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getAllProviderAcceptedService,
  getAllUserAcceptedService,
} from "../../services/servicesService";
import "./RequestedServices.css";

class AcceptedServices extends Component {
  state = {
    acceptedServices: [],
    role: this.props.role,
    id: this.props.profileInformation._id,
  };

  componentDidMount = () => {
    if (this.state.role === "user") {
      this.fetchDataUser();
    } else if (this.state.role === "provider") {
      this.fetchDataProvider();
    }
  };

  fetchDataUser = () => {
    const { id } = this.state;
    getAllUserAcceptedService(id)
      .then((response) => {
        console.log("response accepted list", response);
        this.setState({
          acceptedServices: response.data.acceptedServiceList,
        });
      })
      .catch((err) =>
        console.log("Error retrieving all accepted services: ", err)
      );
  };

  fetchDataProvider = () => {
    const { id } = this.state;
    getAllProviderAcceptedService(id)
      .then((response) => {
        console.log("response list prov", response);
        this.setState({
          acceptedServices: response.data.acceptedServiceList2,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  render() {
    console.log("stateeee on accepted ", this.state);
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <div className="pending-accepted">
          <Link className="link-requests" to={`/requested-services`}>
            Pending
          </Link>
          <p>|</p>
          <Link className="link-requests accepted" to={`/accepted-services`}>
            Accepted
          </Link>
        </div>
        {this.state.acceptedServices.length === 0 ? (
          <p>No accepted services yet</p>
        ) : (
          <>
            {this.state.acceptedServices.map((service) => {
              return (
                <div className="card" key={service._id}>
                  <input type="hidden" name="userId" value={service.userId} />
                  <input
                    type="hidden"
                    name="providerId"
                    value={service.providerId}
                  />
                  {this.state.role === "user" ? (
                    <>
                      <div className="flexCard">
                        <div>
                          {service.providerImageUrl ? (
                            <div
                              className="profilePic"
                              style={{
                                backgroundImage:
                                  "url(" + service.providerImageUrl + ")",
                              }}
                            ></div>
                          ) : (
                            <img
                              className="rounded img-thumbnail img-fluid profile-image"
                              src="./providerAvatar.png"
                              alt="requested service"
                            />
                          )}
                        </div>
                        <div className="cardDetails">
                          <Link to={`/profile/list/` + service.providerId}>
                            {" "}
                            <h4>
                              <strong>
                                {service.providerFirstName}{" "}
                                {service.providerLastName}
                              </strong>
                            </h4>
                          </Link>
                          <p className="categoryPublic">{service.serviceCat}</p>
                          <p>Lesson {service.lessonType}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flexCard">
                        <div>
                          {service.userImageUrl ? (
                            <div
                              className="profilePic"
                              style={{
                                backgroundImage:
                                  "url(" + service.userImageUrl + ")",
                              }}
                            ></div>
                          ) : (
                            <img
                              className="rounded img-thumbnail img-fluid profile-image"
                              src="./providerAvatar.png"
                              alt="requested service"
                            />
                          )}
                        </div>
                        <div className="cardDetails">
                          <Link to={`/profile/` + service.userId}>
                            <h4>
                              <strong>
                                {service.userFirstName} {service.userLastName}
                              </strong>
                            </h4>
                          </Link>
                          <p className="categoryPublic">{service.serviceCat}</p>
                          <p>Lesson {service.lessonType}</p>
                        </div>
                      </div>
                    </>
                  )}
                  <p>Total price:{service.totalPrice} €</p>
                  <p>
                    {" "}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      className="bi bi-calendar-check-fill"
                      fill="rgba(252, 3, 244, 0.5)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                    </svg>{" "}
                    date: {service.date}
                  </p>
                  <Link
                    to={{
                      pathname: `/make-review`,
                      state: {
                        role: this.state.role,
                        service: service,
                      },
                    }}
                  >
                    <button className="general-btn">Make review</button>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default AcceptedServices;
