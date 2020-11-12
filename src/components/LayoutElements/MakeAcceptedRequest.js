import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
    totalPrice: this.props.totalPrice,
    date: this.props.requestedService.date,
    startingTime: this.props.requestedService.startingTime,
    isAccepted: this.props.isAccepted,
    redirect: false,
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
      date,
      startingTime,
    } = this.state;

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
      providerImageUrl,
      date,
      startingTime
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
          date: date,
          startingTime: startingTime,
          isAccepted: true,
        });
        this.setRedirect();
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

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/accepted-services`} />;
    }
  };

  render() {
    return (
      <>
        <div>
          {this.renderRedirect()}

          <form onSubmit={this.handleAcceptedRequest}>
            <button className="general-btn" type="submit">
              Accept
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeAcceptedRequest;
