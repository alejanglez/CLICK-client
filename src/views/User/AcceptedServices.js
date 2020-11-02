import React, { Component } from "react";
import {
  getAllProviderAcceptedService,
  getAllUserAcceptedService,
} from "../../services/servicesService";

class AcceptedServices extends Component {
  state = {
    acceptedServices: [],
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
    getAllUserAcceptedService(id)
      .then((response) => {
        console.log("response accepted list", response);
        this.setState({
          acceptedServices: response.data.acceptedServiceList,
        });
      })
      .catch((err) =>
        console.log("Error retrieving all accepted services: ", err)
      );
  };

  fetchDataProvider = () => {
    const { id } = this.state;
    getAllProviderAcceptedService(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          acceptedServices: response.data.acceptedServiceList2,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  render() {
    console.log("stateeee on accepted ", this.state);
    return (
      <div className="container">
        <h2>Accepted Services list 📣</h2>
        {this.state.acceptedServices.map((service) => {
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

export default AcceptedServices;
