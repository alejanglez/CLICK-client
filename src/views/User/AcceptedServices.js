import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getAllProviderAcceptedService,
  getAllUserAcceptedService,
} from "../../services/servicesService";
import "./RequestedServices.css";

class AcceptedServices extends Component {
  state = {
    acceptedServices: [],
    role: this.props.role,
    id: this.props.profileInformation._id,
  };

  componentDidMount = () => {
    if (this.state.role === "user") {
      this.fetchDataUser();
    } else if (this.state.role === "provider") {
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
        console.log("response list prov", response);
        this.setState({
          acceptedServices: response.data.acceptedServiceList2,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  render() {
    console.log("stateeee on accepted ", this.state);
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <div className="pending-accepted">
          <Link className="link-requests" to={`/requested-services`}>
            Pending
          </Link>
          <p>|</p>
          <Link className="link-requests accepted" to={`/accepted-services`}>
            Accepted
          </Link>
        </div>
        {this.state.acceptedServices.map((service) => {
          return (
            <div className="card" key={service._id}>
              <input type="hidden" name="userId" value={service.userId} />
              <input
                type="hidden"
                name="providerId"
                value={service.providerId}
              />
              {this.state.role == "user" ? (
                <>
                  {
                    <Link to={`/profile/list/` + service.providerId}>
                      <p>
                        Name: {service.providerFirstName}{" "}
                        {service.providerLastName}
                      </p>
                    </Link>
                  }

                  <img
                    className="rounded img-thumbnail img-fluid profile-image"
                    src={service.providerImageUrl}
                  />
                  <p>Category: {service.serviceCat}</p>
                  <p>Lesson Type: {service.lessonType}</p>
                  <p>Rate: {service.rate}</p>
                </>
              ) : (
                <>
                  <Link to={`/profile/list/` + service.userId}>
                    {" "}
                    <p>
                      Name: {service.userFirstName} {service.userLastName}
                    </p>
                  </Link>

                  <img
                    className="rounded img-thumbnail img-fluid"
                    src={service.userImageUrl}
                  />
                  <p>Category: {service.serviceCat}</p>
                  <p>Lesson Type: {service.lessonType}</p>
                  <p>Rate: {service.rate}</p>
                </>
              )}
              <p>Quantity: {service.quantity}</p>
              <p>Total price:{service.totalPrice}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AcceptedServices;
