import React from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
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
  } = props.profileInformation;
  const { role } = props.role;
  console.log("this props", props);
  console.log("img url?", imageUrl);

  return (
    <div>
      <h2>Profile user</h2>
      <h1>
        welcome {firstName && firstName} {lastName && lastName}
      </h1>
      <p>Your address: {address && address}</p>
      <h3>About</h3>
      <p>{about && about}</p>
      <p>Image below</p>
      <img src={imageUrl && imageUrl} />
      <a href={facebookUrl && facebookUrl}>Facebook</a>
      <p>Lesson Type: {lessonType && lessonType}</p>
      <p>Category: {serviceCat && serviceCat}</p>
      <p>Rate: {rate && rate}</p>
    </div>
  );
};

export default Profile;
