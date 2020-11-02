import React, { Component } from "react";
import { createNewRequest } from "../../services/servicesService";

class MakeAcceptedRequest extends Component {
  state = {
    requestedServiceId: this.props.profileInformation._id,
    serviceCat: this.props.profileInformation.providerId.serviceCat,
    lessonType: this.props.profileInformation.providerId.lessonType,
    rate: this.props.profileInformation.providerId.rate,
    firstName: this.props.profileInformation.providerId.firstName,
    lastName: this.props.profileInformation.providerId.lastName,
    imageUrl: this.props.profileInformation.providerId.imageUrl,
    firstName: this.props.profileInformation.userId.firstName,
    lastName: this.props.profileInformation.userId.lastName,
    imageUrl: this.props.profileInformation.userId.imageUrl,
    quantity: this.props.profileInformation.quantity,
    totalPrice: 0,
  };
  componentDidMount = () => {
    console.log("proooooops ", this.props);
  };

  handleAcceptedRequest = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
    createNewRequest(quantity, userId, providerId)
      .then((response) => {
        console.log(response);
        this.setState({
          quantity: quantity,
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
            <label>How many hours?</label>
            <input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              required={true}
              type="number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeAcceptedRequest;
