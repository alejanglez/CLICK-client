import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>welcome</h1>
      <p>How do you want to use Click?</p>
      <br/>
      <Link to={"/signup/user"}><button>User</button></Link>
      <Link to={"/signup/provider"}><button>Provider</button></Link>
    </div>
  );
};

export default Home;
