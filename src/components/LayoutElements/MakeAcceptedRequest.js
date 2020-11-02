import React, { Component } from "react";
import { createNewRequest } from "../../services/servicesService";

class MakeAcceptedRequest extends Component {
  state = {
    requestedServiceId: this.props.requestedService._id,
    serviceCat: this.props.requestedService.providerId.serviceCat,
    lessonType: this.props.requestedService.providerId.lessonType,
    rate: this.props.requestedService.providerId.rate,
    firstNameProvider: this.props.requestedService.providerId.firstName,
    lastNameProvider: this.props.requestedService.providerId.lastName,
    imageUrlProvider: this.props.requestedService.providerId.imageUrl,
    firstNameUser: this.props.requestedService.userId.firstName,
    lastNameUser: this.props.requestedService.userId.lastName,
    imageUrlUser: this.props.requestedService.userId.imageUrl,
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
      firstNameProvider,
      lastNameProvider,
      imageUrlProvider,
      firstNameUser,
      lastNameUser,
      imageUrlUser,
      totalPrice,
    } = this.state;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
    createNewRequest(quantity, userId, providerId)
      .then((response) => {
        console.log(response);
        this.setState({
          quantity: quantity,
          requestedServiceId: requestedServiceId,
          serviceCat: serviceCat,
          lessonType: lessonType,
          rate: rate,
          firstNameProvider: firstNameProvider,
          lastNameProvider: lastNameProvider,
          imageUrlProvider: imageUrlProvider,
          firstNameUser: firstNameUser,
          lastNameUser: lastNameUser,
          imageUrlUser: imageUrlUser,
          totalPrice: totalPrice,
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
