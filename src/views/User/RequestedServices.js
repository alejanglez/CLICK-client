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
    console.log("this state requested services list", this.state);
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
    const { id } = this.state.id;
    getAllProviderRequests(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          requestedServices: response.data.requestedServiceList,
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
    return (
      <div className="container">
        <h2>Requested Services list 📣</h2>
        {this.state.requestedServices.map((service) => {
          return (
            <div className="card" key={service._id}>
              <p>Quantity: {service.quantity}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestedServices;
