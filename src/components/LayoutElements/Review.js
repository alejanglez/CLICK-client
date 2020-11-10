import React, { Component } from "react";
import {
  getAllProviderReview,
  getAllUserReview,
} from "../../services/ReviewService";

class Review extends Component {
  state = {
    reviews: [],
    role: this.props.role,
    id: this.props.id,
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
    getAllUserReview(id)
      .then((response) => {
        console.log("response list review user", response);
        this.setState({
          reviews: response.data.dbReviewsList2,
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
          reviews: response.data.dbReviewsList,
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
    const { role } = this.state;
    console.log("stateeee review ", this.state);
    console.log("props review ", this.props);
    return (
      <div className="container">
        <h2>Reviews</h2>
        {this.state.reviews.map((review) => {
          return (
            <div key={review._id}>
              {review.author === "provider" && role === "user" && (
                <div className="card border-info mb-3">
                  <div className="card-header">Comment:</div>
                  <p className="card-body text-info">{review.comment}</p>
                  <p className="card-body text-info"> {review.rating}</p>
                </div>
              )}
              {review.author === "user" && role === "provider" && (
                <div className="card border-warning mb-3">
                  <div className="card-header">Comment:</div>
                  <p className="card-body text-warning">{review.comment}</p>
                  <p className="card-body text-warning"> {review.rating}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Review;
