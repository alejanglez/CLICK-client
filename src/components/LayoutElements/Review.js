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

  handleTotalStars = (reviews) => {
    console.log(this.state.reviews);
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    const avg = sum / reviews.length || 0;
    return avg;
  };

  handleStars = (review) => {
    const rate = Math.round(review.rating);
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }
    return stars;
  };

  render() {
    const { role, reviews } = this.state;
    console.log("stateeee review ", this.state);
    console.log("props review ", this.props);
    return (
      <div className="container">
        <p className="text-info">{this.handleTotalStars(reviews)} / 5 ★</p>
        {this.state.reviews.map((review) => {
          return (
            <div key={review._id}>
              {review.author === "provider" && role === "user" && (
                <div className="card border-info mb-3">
                  <div className="card-header">Comment:</div>
                  <p>{review.comment}</p>
                  {/* <p className="card-body text-info"> {review.rating}</p> */}
                  <p className="text-info">{this.handleStars(review)}</p>
                </div>
              )}
              {review.author === "user" && role === "provider" && (
                <div className="card border-warning mb-3">
                  <div className="card-header">Comment:</div>
                  <p>{review.comment}</p>
                  <p className="text-warning">{this.handleStars(review)}</p>
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
