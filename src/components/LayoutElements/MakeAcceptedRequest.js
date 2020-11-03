import React, { Component } from "react";
import { createNewRequestAcceptedService } from "../../services/servicesService";

class MakeAcceptedRequest extends Component {
  state = {
    requestedServiceId: this.props.requestedService._id,
    serviceCat: this.props.requestedService.providerId.serviceCat,
    lessonType: this.props.requestedService.providerId.lessonType,
    rate: this.props.requestedService.providerId.rate,
    providerFirstName: this.props.requestedService.providerId.firstName,
    providerLastName: this.props.requestedService.providerId.lastName,
    providerImageUrl: this.props.requestedService.providerId.imageUrl,
    userFirstName: this.props.requestedService.userId.firstName,
    userLastName: this.props.requestedService.userId.lastName,
    userImageUrl: this.props.requestedService.userId.imageUrl,
    quantity: this.props.requestedService.quantity,
    userId: this.props.requestedService.userId._id,
    providerId: this.props.requestedService.providerId._id,
    totalPrice: 0,
  };
  componentDidMount = () => {
    console.log("proooooops ace ", this.props);
  };

  handleAcceptedRequest = (event) => {
    event.preventDefault();
    const {
      userId,
      providerId,
      requestedServiceId,
      quantity,
      serviceCat,
      lessonType,
      rate,
      totalPrice,
      userFirstName,
      userLastName,
      providerFirstName,
      providerLastName,
      userImageUrl,
      providerImageUrl,
    } = this.state;
    // const userId = this.props.userId;
    // const providerId = this.props.profileInformation._id;
    createNewRequestAcceptedService(
      userId,
      providerId,
      requestedServiceId,
      quantity,
      serviceCat,
      lessonType,
      rate,
      totalPrice,
      userFirstName,
      userLastName,
      providerFirstName,
      providerLastName,
      userImageUrl,
      providerImageUrl
    )
      .then((response) => {
        console.log("awwwwwwwaaaa", response);
        this.setState({
          quantity: quantity,
          requestedServiceId: requestedServiceId,
          serviceCat: serviceCat,
          lessonType: lessonType,
          rate: rate,
          providerFirstName: providerFirstName,
          providerLastName: providerLastName,
          providerImageUrl: providerImageUrl,
          userFirstName: userFirstName,
          userLastName: userLastName,
          userImageUrl: userImageUrl,
          totalPrice: totalPrice,
          userId: userId,
          providerId: providerId,
        });
      })
      .catch((err) => console.log("error on handle make request", err));
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleAcceptedRequest}>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeAcceptedRequest;
