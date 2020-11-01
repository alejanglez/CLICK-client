import React, { Component } from "react";
import {
  getAllProviderRequests,
  getAllUserRequests,
} from "../../services/servicesService";

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

  render() {
    console.log("stateeee ", this.state);
    return (
      <div className="container">
        <h2>Requested Services list 📣</h2>
        {this.state.requestedServices.map((service) => {
          return (
            <div className="card" key={service._id}>
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
                  <p>Rate: {service.providerId.rate}</p>
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
              <p>Quantity: {service.quantity}</p>
              <p>Total price: ?</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestedServices;
