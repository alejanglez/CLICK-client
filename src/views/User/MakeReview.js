import React, { Component } from "react";
import { createNewReview } from "../../services/ReviewService";

class MakeReview extends Component {
  state = {
    author: this.props.location.state.role,
    comment: "",
    rating: this.props.location.state.service.rate,
    userId: this.props.location.state.service.userId,
    providerId: this.props.location.state.service.providerId,
    providerFirstName: this.props.location.state.service.providerFirstName,
    providerLastName: this.props.location.state.service.providerLastName,
    userFirstName: this.props.location.state.service.userFirstName,
    userLastName: this.props.location.state.service.userLastName,
    role: this.props.role,
  };
  componentDidMount = () => {
    console.log("proooooops make review ", this.props);
  };

  handleMakeReview = (event) => {
    event.preventDefault();
    const { comment, rating, userId, providerId, author } = this.state;
    createNewReview(author, comment, rating, userId, providerId)
      .then((response) => {
        console.log(response);
        this.setState({
          author: author,
          comment: comment,
          rating: rating,
          userId: providerId,
          providerId: providerId,
        });
        this.props.history.push(`/accepted-services`);
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
    const {
      comment,
      rating,
      providerFirstName,
      providerLastName,
      userFirstName,
      userLastName,
      role,
    } = this.state;
    console.log("state make review", this.state);
    return (
      <>
        <div className="view text-center justify-content-center p-3">
          {role === "user" ? (
            <p className="login-signup-p">
              <strong>
                Leave your review and rating to {providerFirstName}{" "}
                {providerLastName}
              </strong>
            </p>
          ) : (
            <p className="login-signup-p">
              <strong>
                Leave your review and rating to {userFirstName} {userLastName}
              </strong>
            </p>
          )}
          <form onSubmit={this.handleMakeReview}>
            <p className="login-signup-p">Write a review</p>
            <textarea
              name="comment"
              value={comment}
              onChange={this.handleChange}
              required={true}
              type="text"
            />
            <p className="login-signup-p">
              How would you rate the service, from 1 to 5
            </p>
            <select
              name="rating"
              value={rating}
              onChange={this.handleChange}
              required={true}
              type="number"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button className="general-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeReview;
