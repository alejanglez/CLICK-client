import React, { Component } from "react";
import {
  getAllProviderRequests,
  getAllUserRequests,
} from "../../services/servicesService";
import MakeAcceptedRequest from "../../components/LayoutElements/MakeAcceptedRequest";
import { Link } from "react-router-dom";

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
      <div className="container">
        <div>
          <Link to={`/requested-services`}>Pending</Link>
          <p>|</p>
          <Link to={`/accepted-services`}>Accepted</Link>
        </div>
        <h2>Requested Services list 📣</h2>
        {this.state.requestedServices.map((service) => {
          let rate = Number(service.providerId.rate);
          let quant = Number(service.quantity);
          return (
            <div className="card requestedCard" key={service._id}>
              <input type="hidden" name="userId" value={service.userId._id} />
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
                  <img src={service.providerId.imageUrl} />
                  <p>Category: {service.providerId.serviceCat}</p>
                  <p>Lesson Type: {service.providerId.lessonType}</p>
                  <p className="rate">Rate: {service.providerId.rate}</p>
                </>
              ) : (
                <>
                  <p>
                    Name: {service.userId.firstName} {service.userId.lastName}
                  </p>
                  <img src={service.userId.imageUrl} />
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
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestedServices;
