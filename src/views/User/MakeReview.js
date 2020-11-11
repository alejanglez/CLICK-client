import React, { Component } from "react";
import { createNewReview } from "../../services/ReviewService";

class MakeReview extends Component {
  state = {
    author: this.props.location.state.role,
    comment: "",
    rating: this.props.location.state.service.rate,
    userId: this.props.location.state.service.userId,
    providerId: this.props.location.state.service.providerId,
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
    const { comment, rating } = this.state;
    console.log("state make review", this.state);
    return (
      <>
        <div className="card">
          <form onSubmit={this.handleMakeReview}>
            <label>What is your opinion sinner??</label>
            <input
              name="comment"
              value={comment}
              onChange={this.handleChange}
              required={true}
              type="string"
            />
            <input
              name="rating"
              value={rating}
              onChange={this.handleChange}
              required={true}
              type="number"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeReview;
