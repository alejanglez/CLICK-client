import React from "react";
import { Redirect } from "react-router-dom";
import { editPassword } from "../../services/profileInformationService";

class ChangePassword extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    id: this.props.id,
    role: this.props.role,
    redirect: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log("role props pw ", this.props.role);
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
      return <Redirect to={`/profile`} />;
    }
  };

  handleChangePassword = (event) => {
    event.preventDefault();
    const { role, id, oldPassword, newPassword } = this.state;
    editPassword(oldPassword, newPassword, role, id)
      .then((response) => {
        console.log("change pw response ", response);
        this.setRedirect();
      })
      .catch((err) => console.log("err changing pw", err));
  };

  render() {
    const { oldPassword, newPassword } = this.state;
    console.log("props password", this.props);
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        {this.renderRedirect()}

        <form onSubmit={this.handleChangePassword}>
          <label>confirm old password: </label>
          <input
            name="oldPassword"
            value={oldPassword}
            onChange={this.handleChange}
            required={true}
            type="password"
          />
          <label>enter new password: </label>
          <input
            name="newPassword"
            value={newPassword}
            onChange={this.handleChange}
            required={true}
            type="password"
          />

          <button type="submit"> Confirm </button>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
