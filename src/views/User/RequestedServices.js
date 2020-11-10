import React, { Component } from "react";
import {
  getAllProviderRequests,
  getAllUserRequests,
} from "../../services/servicesService";
import MakeAcceptedRequest from "../../components/LayoutElements/MakeAcceptedRequest";
import { Link, Redirect } from "react-router-dom";
import "./RequestedServices.css";

class RequestedServices extends Component {
  state = {
    requestedServices: [],
    role: this.props.role,
    id: this.props.profileInformation._id,
  };

  componentDidMount = () => {
    if (this.state.role == "user") {
      this.fetchDataUser();
    } else if (this.state.role == "provider") {
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
    console.log("stateeee ", this.state);
    const { role } = this.state;
    return (
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
            <div className="card requestedCard" key={service._id}>
              {service.decline && role === "user" && (
                <p className="declined">
                  Your requested service with {service.providerId.firstName} was
                  declined
                </p>
              )}
              {service.decline && role === "provider" && (
                <p className="declined">
                  You declined a service from{" "}
                  <strong>{service.userId.firstName}</strong>
                </p>
              )}
              {!service.decline && (
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
                  {this.state.role == "user" ? (
                    <>
                      <p>
                        Name: {service.providerId.firstName}{" "}
                        {service.providerId.lastName}
                      </p>
                      {service.providerId.imageUrl ? (
                        <img
                          className="rounded img-thumbnail img-fluid"
                          src={service.providerId.imageUrl}
                        />
                      ) : (
                        <img
                          className="rounded img-thumbnail img-fluid profile-image"
                          src="./providerAvatar.png"
                        />
                      )}

                      <p>Category: {service.providerId.serviceCat}</p>
                      <p>Lesson Type: {service.providerId.lessonType}</p>
                      <p className="rate">Rate: {service.providerId.rate}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        Name: {service.userId.firstName}{" "}
                        {service.userId.lastName}
                      </p>

                      {service.userId.imageUrl ? (
                        <img
                          className="rounded img-thumbnail img-fluid"
                          src={service.userId.imageUrl}
                        />
                      ) : (
                        <img
                          className="rounded img-thumbnail img-fluid profile-image"
                          src="./userAvatar.png"
                        />
                      )}
                      <p>Category: {service.providerId.serviceCat}</p>
                      <p>Lesson Type: {service.providerId.lessonType}</p>
                      <p>Rate: {service.providerId.rate}</p>
                    </>
                  )}
                  <p className="quantity">Quantity: {service.quantity}</p>
                  <p>Total price: {this.handleTotalPrice(rate, quant)}</p>
                  {role === "provider" && (
                    <MakeAcceptedRequest
                      requestedService={service}
                      totalPrice={this.handleTotalPrice(rate, quant)}
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
                  )}{" "}
                </>
              )}
            </div>
          );
          {
            /* return ends here */
          }
        })}
      </div>
    );
  }
}

export default RequestedServices;
