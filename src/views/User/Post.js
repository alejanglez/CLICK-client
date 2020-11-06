import React, { Component } from "react";
import {
  getAllProviderPost,
  getSinglePost,
  getAllUserAnswer,
  getSingleAnswer,
} from "../../services/PostAnswerService";
import MakePost from "../../components/LayoutElements/MakePost";

class Post extends Component {
  state = {
    posts: [],
    answers: [],
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
    getAllUserAnswer(id)
      .then((response) => {
        console.log("response list", response);
        this.setState({
          answers: response.data.dbAnswersList,
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
          posts: response.data.dbPostsList,
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

export default Post;
