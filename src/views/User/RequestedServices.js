import React, { Component } from "react";
import {
  getAllProviderRequests,
  getAllUserRequests,
} from "../../services/servicesService";
import MakeAcceptedRequest from "../../components/LayoutElements/MakeAcceptedRequest";
import { Link } from "react-router-dom";
import "./RequestedServices.css";

class RequestedServices extends Component {
  state = {
    requestedServices: [],
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
    getAllUserRequests(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          requestedServices: response.data.requestedServiceList,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  fetchDataProvider = () => {
    const { id } = this.state;
    getAllProviderRequests(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          requestedServices: response.data.requestedServiceList2,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTotalPrice = (rate, quantity) => {
    const total = Number(rate) * Number(quantity);
    return total;
  };

  render() {
    console.log("stateeee ", this.state, "", this.props);
    const { role } = this.state;
    return (
      <div className="requested-services">
        <div className="view text-center p-3 p-md-5 m-md-3">
          <div className="pending-accepted">
            <Link className="link-requests pending" to={`/requested-services`}>
              Pending
            </Link>
            <p>|</p>
            <Link className="link-requests" to={`/accepted-services`}>
              Accepted
            </Link>
          </div>

          {this.state.requestedServices.map((service) => {
            let rate = Number(service.providerId.rate);
            let quant = Number(service.quantity);
            return (
              <div className="card" key={service._id}>
                {service.decline && role === "user" && (
                  <p className="declined">
                    Your requested service with {service.providerId.firstName}{" "}
                    was declined
                  </p>
                )}
                {service.decline && role === "provider" && (
                  <p className="declined">
                    You declined a service from{" "}
                    <strong>{service.userId.firstName}</strong>
                  </p>
                )}
                {service.isAccepted && role === "provider" && (
                  <p className="declined">
                    You accepted a service from{" "}
                    <strong>{service.userId.firstName}!</strong>
                  </p>
                )}
                {service.isAccepted && role === "user" && (
                  <p className="declined">
                    Your request from{" "}
                    <strong>{service.providerId.firstName}!</strong> has been
                    accepted!{" "}
                  </p>
                )}
                {!service.isAccepted && !service.decline && (
                  <>
                    {" "}
                    <input
                      type="hidden"
                      name="userId"
                      value={service.userId._id}
                    />
                    <input
                      type="hidden"
                      name="providerId"
                      value={service.providerId._id}
                    />
                    {this.state.role === "user" ? (
                      <>
                        <div className="flexCard">
                          <div>
                            {service.providerId.imageUrl ? (
                              <div
                                className="profilePic"
                                style={{
                                  backgroundImage:
                                    "url(" + service.providerId.imageUrl + ")",
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
                            <h4>
                              <strong>
                                {service.providerId.firstName}{" "}
                                {service.providerId.lastName}
                              </strong>
                            </h4>
                            <p className="categoryPublic">
                              {service.providerId.serviceCat}
                            </p>
                            <p>Lesson {service.providerId.lessonType}</p>
                            <p>
                              Total price: {this.handleTotalPrice(rate, quant)}{" "}
                              €
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <>
                          <div className="flexCard">
                            <div>
                              {service.userId.imageUrl ? (
                                <div
                                  className="profilePic"
                                  style={{
                                    backgroundImage:
                                      "url(" + service.userId.imageUrl + ")",
                                  }}
                                ></div>
                              ) : (
                                <img
                                  className="rounded img-thumbnail img-fluid profile-image"
                                  src="./userAvatar.png"
                                  alt="requested service"
                                />
                              )}
                            </div>
                            <div className="cardDetails">
                              <h4>
                                <strong>
                                  {service.userId.firstName}{" "}
                                  {service.userId.lastName}
                                </strong>
                              </h4>
                              <p className="categoryPublic">
                                {service.providerId.serviceCat}
                              </p>
                              <p>Lesson {service.providerId.lessonType}</p>
                              <p>
                                Total price:{" "}
                                {this.handleTotalPrice(rate, quant)} €
                              </p>
                            </div>
                          </div>
                        </>
                      </>
                    )}
                    <div className="">
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
                        {service.date}
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="rgba(252, 3, 244, 0.5)"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-7v-8h2v6h5v2z" />
                        </svg>{" "}
                        {service.startingTime}, for {service.quantity} hours
                      </p>
                    </div>
                    {role === "provider" && (
                      <MakeAcceptedRequest
                        requestedService={service}
                        totalPrice={this.handleTotalPrice(rate, quant)}
                        {...this.props}
                      />
                    )}
                    {role === "user" && <p>Waiting...</p>}
                    {role === "provider" && (
                      <Link
                        className="link-react"
                        to={{
                          pathname: `/requests/details`,
                          state: {
                            requestDetails: service,
                            role: role,
                          },
                        }}
                      >
                        Decline
                      </Link>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RequestedServices;
