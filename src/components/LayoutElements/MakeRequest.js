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
        <div className="view text-center p-3 app">
          {this.renderRedirect()}
          <form onSubmit={this.handleMakeRequest}>
            <p className="login-signup-p">Choose a date</p>
            <input
              name="date"
              value={date}
              onChange={this.handleChange}
              required={true}
              type="date"
            />
            <p className="login-signup-p">Starting time</p>
            <input
              name="startingTime"
              value={startingTime}
              onChange={this.handleChange}
              required={true}
              type="time"
            />
            <p className="login-signup-p">Amount of hours needed (up to 5)</p>
            <input
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
              required={true}
              type="number"
            />{" "}
            <button className="general-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default MakeRequest;
