import React from "react";
class About extends React.Component {
  state = {
    authenticated: this.props.authenticated,
    role: this.props.role,
  };
  render() {
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <h2>
          <strong>CLICK-APP</strong>
        </h2>
        <p>
          The application is born to bring local academic professionals closer
          to families in need.
          <br />
          Covering the necessity of supporting our children. <br />
          Facilitating the reconciliation of work and family life. Reliable and
          secure for all users.
          <br />
          Created with 💜 fully remotly between LISBON & MADRID and designed for
          everyone without exception. <br />
        </p>
        <br />
        <div className="col-lg-6 col-md-6 mb-lg-0 mb-5">
          <div className="avatar mx-auto">
            <img
              src="./profile1.jpg"
              width="200"
              height="200"
              className="rounded-circle z-depth-1"
              alt="Sample avatar"
            />
          </div>
          <h5 className="font-weight-bold mt-4 mb-3">Raquel Nascimento</h5>
          <p className="text-uppercase blue-text">
            <strong>CTO</strong>
          </p>
          <p className="grey-text">
            Fullstack Dev. 💻 & Jiu-jitsu passionate🥋
          </p>
        </div>
        <div className="col-lg-6 col-md-6 mb-lg-0 mb-5">
          <div className="avatar mx-auto">
            <img
              src="./profile2.jpg"
              className="rounded-circle z-depth-1"
              width="200"
              height="200"
              alt="Sample avatar"
            />
          </div>
          <h5 className="font-weight-bold mt-4 mb-3">Alejandro González</h5>
          <p className="text-uppercase blue-text">
            <strong>CTO</strong>
          </p>
          <p className="grey-text">Fullstack Dev. 💻 & Swimming lover 🏊</p>
        </div>
        <p>
          Typography "Britanica" by SANTIREYDESIGN
          <a href="http://santireydesign.com/">
            <img src="/logosanti.png" width="30" height="30" alt="logosanti" />
          </a>
        </p>
        <p>Vídeo from Pavel Danilyuk in Pexels</p>
      </div>
    );
  }
}
export default About;
