import React, { Component } from "react";
import { createNewRequest } from "../../services/servicesService";

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
    totalPrice: 0,
  };
  componentDidMount = () => {
    console.log("proooooops ", this.props);
  };

  handleAcceptedRequest = (event) => {
    event.preventDefault();
    const {
      quantity,
      requestedServiceId,
      serviceCat,
      lessonType,
      rate,
      providerFirstName,
      providerLastName,
      providerImageUrl,
      userFirstName,
      userLastName,
      userImageUrl,
      totalPrice,
    } = this.state;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
    createNewRequest(quantity, requestedServiceId)
      .then((response) => {
        console.log(response);
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
    const { quantity } = this.state;
    return (
      <>
        <div>
          <form onSubmit={this.handleMakeRequest}>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeAcceptedRequest;
