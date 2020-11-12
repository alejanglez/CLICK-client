import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { createNewRequest } from "../../services/servicesService";

class MakeRequest extends Component {
  state = {
    quantity: 0,
    userId: "",
    providerId: "",
    redirect: false,
    date: Date.now(),
    startingTime: "18:00",
  };
  componentDidMount = () => {
    console.log("proooooops req ", this.props);

    console.log("proooooops req state ", this.params);
  };

  handleMakeRequest = (event) => {
    event.preventDefault();
    const { quantity, date, startingTime } = this.state;
    const userId = this.props.userId;
    const providerId = this.props.profileInformation._id;
    createNewRequest(quantity, userId, providerId, date, startingTime)
      .then((response) => {
        console.log(response);
        this.setState({
          quantity: quantity,
          userId: userId,
          providerId: providerId,
          date: String(date),
          startingTime: String(startingTime),
        });
        this.setRedirect();
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

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/requested-services`} />;
    }
  };

  render() {
    const { quantity, date, startingTime } = this.state;
    return (
      <>
        <div className="card">
          {this.renderRedirect()}
          <form onSubmit={this.handleMakeRequest}>
            <label>How many hours?</label>
            <input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              required={true}
              type="number"
            />{" "}
            <label>date?</label>
            <input
              name="date"
              value={date}
              onChange={this.handleChange}
              required={true}
              type="date"
            />
            <label>start time?</label>
            <input
              name="startingTime"
              value={startingTime}
              onChange={this.handleChange}
              required={true}
              type="time"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeRequest;
