import React, { Component } from "react";
import { createNewReview } from "../../services/ReviewService";

class MakeReview extends Component {
  state = {
    author: this.props.role,
    comment: "",
    rating: 0,
    userId: "",
    providerId: "",
  };
  componentDidMount = () => {
    console.log("proooooops req ", this.props);
  };

  handleMakePost = (event) => {
    event.preventDefault();
    const { comment, rating } = this.state;
    const author = this.props.role;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
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
    return (
      <>
        <div className="card">
          <form onSubmit={this.handleMakeRequest}>
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
