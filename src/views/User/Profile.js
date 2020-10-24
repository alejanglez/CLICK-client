import React from "react";

const Profile = (props) => {
    const { firstName, lastName, address, about} = props.user
  return (
    <div>
    <h2>Profile user</h2>
      <h1>welcome {firstName && props.user.firstName} {lastName && props.user.lastName}</h1>
      <p>Your address: {address && props.user.address}</p>
      <h3>About</h3>
      <p>{about && props.user.about}</p>
          </div>
  );
};

export default Profile;