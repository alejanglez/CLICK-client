import React, { Component } from "react";
import {
  getAllProviderReview,
  getSingleReview,
} from "../../services/ReviewService";
import MakeReview from "../../components/LayoutElements/MakeReview";

class Review extends Component {
  state = {
    reviews: [],
    author: this.props.role,
    id: this.props.profileInformation._id,
  };

  componentDidMount = () => {
    if ((this.state.role == "user") != this.state.author) {
      this.fetchDataUser();
      //here fech data when author is not user!!
    } else if ((this.state.role == "provider") != this.state.author) {
      this.fetchDataProvider();
      //here fech data when author is not provider!!
    }
  };

  fetchDataUser = () => {
    const { id } = this.state;
    getAllUserAnswer(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          reviews: response.data.dbReviewList,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  fetchDataProvider = () => {
    const { id } = this.state;
    getAllProviderPost(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          reviews: response.data.dbReviewList,
        });
      })
      .catch((err) => console.log("Error retrieving all providers: ", err));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // handleTotalRate = (rate, quantity) => {
  //   const total = Number(rate) * Number(quantity);
  //   return total;
  // };

  render() {
    console.log("stateeee ", this.state);
    return (
      <div className="container">
        <h2>Requested Services list 📣</h2>
        {this.state.requestedServices.map((post) => {
          {
            /* let rate = Number(service.providerId.rate);
          let quant = Number(service.quantity); */
          }
          return (
            <div className="card requestedCard" key={post._id}>
              <input type="hidden" name="userId" value={post.userId._id} />
              <input
                type="hidden"
                name="providerId"
                value={post.providerId._id}
              />
              {/* {this.state.role == "user" ? (
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
              )} */}
              {/* <p className="quantity">Quantity: {service.quantity}</p>
              <p>Total price: {this.handleTotalPrice(rate, quant)}</p> */}
              {/* <MakeAcceptedRequest
                requestedService={service}
                totalPrice={this.handleTotalPrice(rate, quant)}
              /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Review;
