import React, { Component } from "react";

import { getSingleRequestedService } from "../../services/servicesService";
import { declineSingleRequestedService } from "../../services/servicesService";

class SingleRequest extends Component {
  state = {
    service: this.props.location.state.requestDetails,
    requestId: this.props.location.state.requestDetails._id,
    role: this.props.role,
  };

  componentDidMount = () => {
    const { requestId } = this.state;
    console.log("props single request", this.props);
    console.log("state single request", this.state);

    this.setState({ userId: this.props.profileInformation._id });
    getSingleRequestedService(requestId).then((response) => {
      this.setState({
        service: response.data.foundRequestedService,
      });
    });
  };

  handleDecline = (event) => {
    event.preventDefault();
    const { requestId } = this.state;
    declineSingleRequestedService(requestId)
      .then((response) => {
        console.log("decline response", response);
        this.props.history.push(`/requested-services`);
      })
      .catch((err) => console.log("error on handle make request", err));
  };

  handleTotalPrice = (rate, quantity) => {
    const total = Number(rate) * Number(quantity);
    return total;
  };

  render() {
    const { service } = this.state;
    let rate = Number(service.providerId.rate);
    let quant = Number(service.quantity);
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <p>
          <strong>Request Details</strong>
        </p>

        <div className="card requestedCard" key={service._id}>
          <input type="hidden" name="userId" value={service.userId._id} />
          <input
            type="hidden"
            name="providerId"
            value={service.providerId._id}
          />
          {this.state.role === "provider" && (
            <>
              <p>Are you sure you want to decline?</p>
              <button className="general-btn" onClick={this.handleDecline}>
                Yes, I want to decline
              </button>
            </>
          )}
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
                Name: {service.userId.firstName} {service.userId.lastName}
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
        </div>
      </div>
    );
  }
}

export default SingleRequest;
