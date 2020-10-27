import React from "react";

const Profile = (props) => {
    const { firstName, lastName, address, about} = props.profileInformation
    const {role} = props.role
    console.log('this props', props)

  return (
    <div>
    <h2>Profile user</h2>
      <h1>welcome {firstName && firstName} {lastName && lastName}</h1>
      <p>Your address: {address && address}</p>
      <h3>About</h3>
      <p>{about && about}</p>
      <h2>heloooooo</h2>
          </div>
  );
};

export default Profile;