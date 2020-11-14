import React from "react";

class About extends React.Component {
  state = {
    authenticated: this.props.authenticated,
    role: this.props.role,
  };

  render() {
    return (
      <div className="view text-center p-3 p-md-5 m-md-3">
        <h2>About page</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolor
        </p>
        <br />
        <div className="col-lg-6 col-md-6 mb-lg-0 mb-5">
          <div className="avatar mx-auto">
            <img
              src="./profile1.jpg"
              className="rounded-circle z-depth-1"
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
              className="rounded-circle z-depth-1"
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
        <p>Vídeo de Pavel Danilyuk en Pexels</p>
      </div>
    );
  }
}

export default About;
