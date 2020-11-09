import React, { Component } from "react";
import { createNewRequest } from "../../services/servicesService";

class MakeRequest extends Component {
  state = {
    quantity: 0,
    userId: "",
    providerId: "",
  };
  componentDidMount = () => {
    console.log("proooooops req ", this.props);

    console.log("proooooops req state ", this.params);
  };

  handleMakeRequest = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
    createNewRequest(quantity, userId, providerId)
      .then((response) => {
        console.log(response);
        this.setState({
          quantity: quantity,
          userId: userId,
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
    const { quantity } = this.state;
    return (
      <>
        <div className="card">
          <form onSubmit={this.handleMakeRequest}>
            <label>How many hours?</label>
            <input
              name="quantity"
              value={quantity}
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

export default MakeRequest;
