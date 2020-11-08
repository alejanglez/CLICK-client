import React, { Component } from "react";
import {
  getAllProviderReview,
  getAllUserReview,
  getSingleReview,
} from "../../services/ReviewService";
import MakeReview from "../../components/LayoutElements/MakeReview";

class Review extends Component {
  state = {
    reviews: [],
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
    getAllUserReview(id)
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
    getAllProviderReview(id)
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
        {this.state.reviews.map((review) => {
          {
            /* let rate = Number(service.providerId.rate);
          let quant = Number(service.quantity); */
          }
          return (
            console.log("review", review),
            {
              /* <div className="card requestedCard" key={post._id}>
              <input type="hidden" name="userId" value={post.userId._id} />
              <input
                type="hidden"
                name="providerId"
                value={post.providerId._id}
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
            
              
            </div>*/
            }
          );
        })}
      </div>
    );
  }
}

export default Review;
