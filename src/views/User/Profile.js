import React from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  // const { test } = props.location.state;
  const {
    firstName,
    lastName,
    address,
    about,
    imageUrl,
    lessonType,
    serviceCat,
    facebookUrl,
    rate,
    _id,
  } = props.profileInformation;
  console.log("login props", props);
  // console.log("test", test);
  const { role, sessionUserId, sessionProviderId } = props;
  console.log("user id session", sessionUserId);
  console.log("user id ", _id);
  return (
    <div>
      <h2>Profile 🐲</h2>
      <p hidden>{_id && _id}</p>
      <h1>
        welcome {firstName && firstName} {lastName && lastName}
      </h1>
      <p>Your address: {address && address}</p>
      <h3>About</h3>
      <p>{about && about}</p>
      <p>Image below</p>
      <img src={imageUrl && imageUrl} />
      {role == "provider" && (
        <>
          {" "}
          <a href={facebookUrl && facebookUrl}>Facebook</a>
          <p>Lesson Type: {lessonType && lessonType}</p>
          <p>Category: {serviceCat && serviceCat}</p>
          <p>Rate: {rate && rate}</p>{" "}
        </>
      )}
      {sessionProviderId && _id == sessionProviderId._id && (
        <>
          <Link to={`/profile/editProfile`}>Edit Profile</Link>
        </>
      )}
      {sessionUserId && _id == sessionUserId._id && (
        <>
          <Link to={`/profile/editProfile`}>Edit Profile</Link>
        </>
      )}


      
    </div>
  );
};




export default Profile;
